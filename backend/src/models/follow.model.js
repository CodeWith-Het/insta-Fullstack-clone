const mongoose = require("mongoose");

const followModelSchema = new mongoose.Schema(
  {
    follower: {
      type:String
    },
    following: {
      type:String
    },
    status: {
      type: String,
      default: "pending",
      enum:["pending", "accepted", "rejected"]
    },
  },
  { timestamps: true },
);

followModelSchema.index({ follower: 1, following: 1 }, { unique: true });

const followModel = mongoose.model("follow", followModelSchema);
module.exports = followModel;
