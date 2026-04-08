const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const { Folders } = require("@imagekit/nodejs/resources/index.js");
const jwt = require("jsonwebtoken")

// imagekit provide cloudebased service
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});    

async function createPostController(req, res) {
  console.log(req.body, req.file); // req.file this file data reading middleware

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provide, unauthorized access",
    });
  }

  // verify token for user access
  let decoded = null;

  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "User not Authorized",
    });
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "image",
    folder: "Insta_Post_Image_Collection",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decode.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

module.exports = {
  createPostController,
};
