const mongoose = require("mongoose");

const postModelSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      default: "",
    },
    imgFile: {
      type: String,
      required: [true, "imgUrl is required for creating post"],
    },
    username:{
    type: String,
    required:true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"user",
      required: [true, "user id is required for creating post"],
    },
    likeCounter: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const postModel = mongoose.model("post", postModelSchema);
module.exports = postModel;
