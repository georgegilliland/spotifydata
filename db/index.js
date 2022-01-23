const mongoose = require("mongoose");
require('dotenv').config();
const uri = process.env.MONGODB_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

let isConnected;
let db;

const connectDB = async () => {
  if (isConnected) return db;
  try {
    db = await mongoose.connect(uri, options);
    isConnected = db.connections[0].readyState;
    console.log("db connected")
    return db;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = connectDB;