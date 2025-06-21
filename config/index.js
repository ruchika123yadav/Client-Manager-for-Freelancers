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