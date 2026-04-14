const mongoose = require("mongoose")

const likeModelSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [ true, "Post ID is required" ]
    },
    username: {
        type: String,
        required: [ true, "Username is required" ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [ true, "User ID is required" ]
    }
},
    { timestamps: true }
)

likeModelSchema.index({post: 1, username: 1}, {unique: true})

const likeModel = mongoose.model("like", likeModelSchema)
module.exports=likeModel