const mongoose = require("mongoose")

const followModelSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:[true,"Follower Required"]
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:[true,"following Required"]
    }
},
    {timestamps: true}
)

const followModel = mongoose.model("follow",followModelSchema)
module.exports = followModel