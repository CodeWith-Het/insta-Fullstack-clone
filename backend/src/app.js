const express = require("express")

// required routers
const authRouter =   require("./routers/auth.route")
const postRouter = require("./routers/post.route")
const userRouter = require("./routers/user.route")

const cookieParser = require("cookie-parser")
const app = express();

// middlewares fuctions
app.use(express.json());
app.use(cookieParser());

// using routers
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)
app.use("/api/user", userRouter)


module.exports = app;
