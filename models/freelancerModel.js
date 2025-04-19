const { required } = require("joi");
const mongoose =require("mongoose")

const Schema= mongoose.Schema;

const FreelancerSchema= new Schema({
        fullname: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type:Number,
            required:true,
            unique:true,
            minlength: 10,
        },
        projectName: {
            type:String,
            required:true
        },
        paymentStatus:{
            type:String,
            required:true,
            enum: ['Paid', 'Unpaid'],
            default: 'Unpaid'
        }
      
      
},{ timestamps: true })

module.exports= mongoose.model("Freelancer", FreelancerSchema)