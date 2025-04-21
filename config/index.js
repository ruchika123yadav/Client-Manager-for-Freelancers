const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const Freelancer = require("../models/freelancerModel");
const freelancerData = require("./data");

mongoose
  .connect("mongodb://127.0.0.1:27017/cmr", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connection established");
    // initDb(); // move inside here to avoid async timing issues
  })
  .catch((err) => {
    dbgr("Connection error:", err);
  });

// const initDb = async () => {
//   try {
//     const count = await Freelancer.countDocuments();
//     if (count === 0) {
//       await Freelancer.insertMany(freelancerData.data);
//       console.log("Data inserted successfully");
//     } else {
//       console.log("Data already exists. Skipping insertion.");
//     }
//   } catch (err) {
//     console.error("Error inserting data:", err);
//   }
// };

module.exports = mongoose.connection;
