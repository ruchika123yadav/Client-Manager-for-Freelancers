const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  clientId:       { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "Client", required: true 
    
  },
  title:          { 
    type: String,
     required: true 
    
  },
  description:    { 
    type: String 
    
  },
  deadline:       { 
    type: Date 
    
  },
  paymentStatus:  { 
    type: String,
     enum: ["Pending", "Paid", "Overdue"], 
    default: "Pending" 
    
  },
  amount:         { 
    type: Number 
    
  },
  isCompleted:    { 
    type: Boolean, 
    default: false 
    
  }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
