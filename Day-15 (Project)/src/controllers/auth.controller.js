const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerControll(req, res) {
  const { username, email, password, bio, profile_image } = req.body;

  const isUserAlreadyExistByEmail = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExistByEmail) {
    const message =
      isUserAlreadyExistByEmail.email === email
        ? "Email Already Exist"
        : "Username Already Exist";

    return res.status(409).json({ message });
  }

  // using bcrypt
  const hash = await bcrypt.hash(password, 12);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profile_image,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "User Created Successfully",
    user: {
      username,
      email,
      bio,
      profile_image,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "user not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(404).json({
      message: "password is invaild",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Successfully Logging",
    user: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
}

module.exports = {
  registerControll,
  loginController,
};
