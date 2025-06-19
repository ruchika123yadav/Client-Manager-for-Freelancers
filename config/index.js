// const mongoose = require("mongoose");
// const dbgr = require("debug")("development:mongoose");
// const Freelancer = require("../models/client");
// const freelancerData = require("./data");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/cmr", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connection established");
//     // initDb(); // move inside here to avoid async timing issues
//   })
//   .catch((err) => {
//     dbgr("Connection error:", err);
//   });



// module.exports = mongoose.connection;


require('dotenv').config();
const mongoose = require("mongoose");

const dbName = "freelancerManager";
const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hahzcwr.mongodb.net/${dbName}`;

mongoose.connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });