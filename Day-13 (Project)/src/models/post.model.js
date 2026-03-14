const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default:""
    },
    imgUrl: {
        type: String,
        required:[true,"imgUrl is required for creatinh post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,  //MongoDB me har document ka ek unique user _id hota hai.
        ref: "insta_users", //mongodb collection ka name hai jo vaha se ref leta hai
        required:[true,"user id required for creating post"]
    }
})

const postModel = mongoose.model("post_Data", postSchema)
module.exports=postModel