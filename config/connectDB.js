const monoose = require("mongoose");

const connectDB = async () => {
  try {
    await monoose.connect(process.env.MONGO_URI);
    console.log("DB connected");

  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
