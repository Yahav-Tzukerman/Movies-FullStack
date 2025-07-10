// configs/db.js
const mongoose = require("mongoose");
const config = require("../config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to UsersDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;
