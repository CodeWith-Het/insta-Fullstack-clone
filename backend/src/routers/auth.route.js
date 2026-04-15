const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware")

authRouter.post("/register", authController.registerControll);
authRouter.post("/login", authController.loginController);
authRouter.get("/getLoginData", identifyUser,authController.getLoginDataController)

module.exports = authRouter;