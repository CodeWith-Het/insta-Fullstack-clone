const express = require("express");
const multer = require("multer");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/post.middleware")

const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/createpost",upload.single("imgFile"),identifyUser,postController.postCreateController);
postRouter.get("/getpost", identifyUser,postController.getpostController);
postRouter.get("/getpostdetails/:postId", identifyUser,postController.postDetails);

module.exports = postRouter;