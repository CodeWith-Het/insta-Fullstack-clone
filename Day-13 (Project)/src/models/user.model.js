const mongoose = require("mongoose");

const userSchemaModel = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username Already Exist"],
    required: [true, "Username required"],
  },
  email: {
    type: String,
    unique: [true, "Email Already Exist"],
    required: [true, "Email required"],
  },
  password: {
    type: String,
    unique: [true, "password Already Exist"],
    required: [true, "password required"],
  },
  bio: String,
  profile_image: {
    type: String,
    default:
      "https://i.pinimg.com/originals/9d/d2/90/9dd2906190f0c1813429fe0c8695ed04.png",
  },
});

const userModel = mongoose.model("Insta_User", userSchemaModel);
module.exports = userModel;
