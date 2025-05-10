const mongoose =require('mongoose')
const passportLocalMoongose=require('passport-local-mongoose')


const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  role:     { type: String, default: "freelancer" },
  phoneNumber: { type: Number, required: true },
  picture: {
    data: Buffer,
    contentType: String
  },
  clients:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Client"
  }]
}, { timestamps: true });

userSchema.plugin(passportLocalMoongose, { usernameField: 'email' });

module.exports = mongoose.model("User", userSchema);
