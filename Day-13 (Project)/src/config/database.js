const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connect To Database");
  });
};

module.exports = connectToDB;