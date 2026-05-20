const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const followModel = require("../models/follow.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function postCreateController(req, res) {
  try {
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
      username: req.user.username,
    });

    res.status(201).json({
      message: "Post successfully created",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
}

async function getpostController(req, res) {
  try {
    const userId = req.user.id;

    const post = await postModel.find({
      user: userId,
    });

    res.status(200).json({
      message: "posts fetch",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
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

async function toggleLikeController(req, res) {
  try {
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
      user: userId,
    });

    if (isAlreadyLiked) {
      await likeModel.findByIdAndDelete(isAlreadyLiked._id);

      const updatedPost = await postModel.findByIdAndUpdate(
        postId,
        { $inc: { likeCounter: -1 } },
        { returnDocument: "after" },
      );

      return res.status(200).json({
        message: "Post Unliked",
        likeCounter: updatedPost.likeCounter,
        isLiked: false,
      });
    }

    const likeData = await likeModel.create({
      post: postId,
      username: username,
      user: userId,
    });

    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { $inc: { likeCounter: 1 } },
      { new: true },
    );

    const creatorPost = post.user.username;

    res.status(201).json({
      message: `You have liked the post`,
      creator: creatorPost,
      like: likeData,
      likeCounter: updatedPost.likeCounter,
      isLiked: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
}

async function getFeedController(req, res) {
  try {
    const posts = await postModel
      .find({})
      .populate("user", "username profile_image")
      .sort({ createdAt: -1 })
      .lean();

    const userLikes = await likeModel.find({ user: req.user.id });
    const likedPostIds = userLikes.map((like) => like.post.toString());

    const myFollowings = await followModel.find({
      follower: req.user.username,
    });
    const followStatusMap = {};

    myFollowings.forEach((follow) => {
      followStatusMap[follow.following] = follow.status;
    });

    const feed = posts.map((post) => {
      return {
        ...post,
        isLiked: likedPostIds.includes(post._id.toString()),
        user: {
          ...post.user,
          followStatus: followStatusMap[post.user.username] || "none",
        },
      };
    });

    res.status(200).json({
      message: "Post Fetch Successfully",
      feed,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching feed",
      error: error.message,
    });
  }
}

module.exports = {
  postCreateController,
  getpostController,
  postDetails,
  toggleLikeController,
  getFeedController,
};
