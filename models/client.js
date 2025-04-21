const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", required: true
 }, // freelancer
  name:   { 
    type: String,
     required: true
     },

  email:  {
     type: String 
    },
  phone:  {
     type: String 
    },
  company:{
     type: String 
    },
  notes:  { 
    type: String 
}, // personal notes about client
}, {
     timestamps: true
     });

module.exports = mongoose.model("Client", clientSchema);
