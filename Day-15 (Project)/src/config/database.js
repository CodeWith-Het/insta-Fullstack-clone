const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
      try {
        console.log("connected to MongoDB");
      } catch (error) {
        console.log("error connecting to MongoDB");
      }
    });
}

module.exports=connectToDB