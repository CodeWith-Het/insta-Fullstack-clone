const express = require("express")
const jwt = require("jsonwebtoken")
const userSchemaModels = require("../models/user.models")
const crypto = require("crypto");

const authRouter = express.Router()

authRouter.post("/register",async (req, res) => {
    const { name, email, password } = req.body;

    const isUserAlreadyExist = await userSchemaModels.findOne({ email })
    
    if (isUserAlreadyExist) {
        res.status(409).json({
            message:"This Email Account already exist"
        })
  }
  
  const hash =crypto.createHash("md5").update(password).digest("hex")

    const userData = await userSchemaModels.create({
      name,
      email,
      password: hash
    });

    const token = jwt.sign(
      {
        id: userData._id,
        email: userData.email,
      },
      process.env.JWT_SECRET,
  );
  
  res.cookie("jwt_token",token)

    res.status(201).json({
        messgae: "user data created",
        userData,
        token
    })
    
})

authRouter.post("/protected", (req, res) => {
  console.log("protected your account", req.cookies);

  res.status(200).json({
    message:"this is protected Account"
  })
});

authRouter.post("/login", async(req, res) => {
  const { email, password } = req.body
  
  const user = await userSchemaModels.findOne({ email })
  
  if (!user) {
    return res.status(404).json({
      messgae:"user is not found"
    })
  }

  const isPassword = user.password === crypto.createHash("md5").update(password).digest("hex")

  if (!isPassword) {
    return res.status(401).json({
      message:"User Password id worng"
    })
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
  
   res.cookie("jwt_token", token);
  
  res.status(200).json({
    message: "User Is Loggin",
    user,
    token
  })
})

module.exports=authRouter