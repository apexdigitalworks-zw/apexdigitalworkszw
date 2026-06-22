const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/apexdigitalworkszw";
    await mongoose.connect(uri);
    console.log(`[MongoDB] Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error(`[MongoDB] Connection error: ${err.message}`);
    console.error(
      "Make sure MONGO_URI is set correctly in your .env file and MongoDB is reachable."
    );
    process.exit(1);
  }
};

module.exports = connectDB;
