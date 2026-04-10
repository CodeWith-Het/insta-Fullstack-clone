const mongoose = require("mongoose");

const postModelSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      default: "",
    },
    imgFile: {
      type: String,
      required: [true, "imgUrl is required for creating post"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id is required for creating post"],
    },
  },
  {
    timestamps: true,
  },
);

const postModel = mongoose.model("post", postModelSchema);
module.exports = postModel;
