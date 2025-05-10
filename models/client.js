const mongoose = require("mongoose");
const Projects=require("./project.js")
const clientSchema = new mongoose.Schema({
  name:   { 
    type: String,
     required: true
     },
  email:  {
     type: String,
     unique: true
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
    projects:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Project"
  }]
},

{
     timestamps: true
     });

     clientSchema.post("findOneAndDelete",async(client)=>{
      if(client){
    await Projects.deleteMany({_id:{$in:client.projects}})
      }
     })
module.exports = mongoose.model("Client", clientSchema);
