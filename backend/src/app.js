const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

// required routers
const authRouter =   require("./routers/auth.route")
const postRouter = require("./routers/post.route")
const userRouter = require("./routers/user.route")

const app = express();

// middlewares fuctions
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());


// using routers
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)
app.use("/api/user", userRouter)


module.exports = app;