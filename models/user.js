const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, required: true 

  },
  email:    { 
    type: String, required: true, unique: true 

  },
  password: { 
    type: String, required: true 

  }, // hashed

  role:     { 
    type: String, default: "freelancer" 

  },
  phoneNumber:{
    type:Number,
    required:true
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

