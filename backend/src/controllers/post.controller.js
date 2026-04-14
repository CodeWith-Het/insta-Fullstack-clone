const jwt = require("jsonwebtoken")
const postModel = require("../models/post.model")
const likeModel = require("../models/like.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function postCreateController(req, res) {
  console.log(req.body, req.file);

  const file = await imagekit.files.upload({
    file: await toFile(req.file.buffer, "file"),
    fileName: "image",
    folder: "Insta_Post_collection_3",
  });

  if (!req.file) {
    return res.status(400).json({
      message: "Image file is required",
    });
  }

  const post = await postModel.create({
    caption: req.body.caption,
    imgFile: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post successfully created",
    data: post,
  });
}

async function getpostController(req, res) {
  const userId = req.user.id;

  const post = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "posts fetch",
    post,
  });
}

async function postDetails(req, res) {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
      return res.status(403).json({
        message: "Forbidden Content: You are not allowed to view this post",
      });
    }

    return res.status(200).json({
      message: "Post fetched successfully",
      post: post,
    });
  } catch (error) {
    console.error("Error in postDetails:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;
  const userId = req.user.id;

  const post = await postModel.findById(postId).populate("user", "username");

  if (!post) {
    return res.status(404).json({
      message: "Post does not exist",
    });
  }

  const isAlreadyLiked = await likeModel.findOne({
    post: postId,
    username: username
  });

  if (isAlreadyLiked) {
    return res.status(400).json({
      message: "You have already liked this post",
      post: postId,
      username: username,
    });
  }

  const likeData = await likeModel.create({
    post: postId,
    username: username,
    user: userId,
  });

  const creatorPost = post.user.username


  res.status(201).json({
    message: `You have liked the post with ID ${postId}`,
    creator:creatorPost,
    like: likeData
  });
}

module.exports = {
  postCreateController,
  getpostController,
  postDetails,
  likePostController
};
