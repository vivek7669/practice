require("dotenv").config();
const mongoose = require("mongoose");

const dbConnector = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL);
    if(!db) return console.log("can't connect to database.");
    return console.log("connect to database.");
  } catch (error) {
    console.log("ERR : ",error);
  }
}

module.exports = dbConnector;