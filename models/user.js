const mongoose =require('mongoose')
const passportLocalMoongose=require('passport-local-mongoose')


const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  role:     { type: String, default: "freelancer" },
  phoneNumber: { type: Number, required: true }
}, { timestamps: true });

userSchema.plugin(passportLocalMoongose, { usernameField: 'email' });

module.exports = mongoose.model("User", userSchema);
