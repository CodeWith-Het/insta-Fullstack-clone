const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email required"],
  },
  password: {
    type: String,
    unique: true,
    required: true,
    select: false,
  },
  bio: String,
  profile_image: {
    type: String,
    default:"https://i.pinimg.com/originals/9d/d2/90/9dd2906190f0c1813429fe0c8695ed04.png"
  },
});

const userModel = mongoose.model("user", userModelSchema);
module.exports = userModel;
