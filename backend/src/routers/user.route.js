const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware");
const userRouter = express.Router()

userRouter.post("/follow/:username", identifyUser, userController.followUserController)
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)
userRouter.post("/followrequest/send/:username", identifyUser, userController.sendFollowRequestController)
userRouter.put("/followrequest/accept/:username", identifyUser ,userController.acceptFollowRequestController)
userRouter.put("/followrequest/reject/:username", identifyUser ,userController.rejectFollowRequestController)

module.exports = userRouter