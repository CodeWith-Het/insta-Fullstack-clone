const express = require("express");
const multer = require("multer");

const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");
const postRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/createpost",upload.single("imgFile"),identifyUser,postController.postCreateController,);
postRouter.get("/getpost", identifyUser, postController.getpostController);
postRouter.get("/getpostdetails/:postId", identifyUser, postController.postDetails,);
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

module.exports = postRouter;
