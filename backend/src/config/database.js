const mongoose = require("mongoose")

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
      try {
        console.log("Connected to DB");
      } catch (error) {
        console.log("Error connecting to DB");
      }
    });
}

module.exports=connectToDB