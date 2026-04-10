const express = require('express');
const authRouter = require("./routers/auth.route")
const postRouter = require("./routers/post.route")
const cookieParser = require("cookie-parser")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)

module.exports=app