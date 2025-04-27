const express=require('express')
const router=express.Router();
const passport = require('passport');
const userController=require('../controllers/authController')
const User=require('../models/user')
const localStrategy = require('passport-local');
passport.use(new localStrategy(User.authenticate()));

router.post("/signup", userController.signupUser);

router.post('/login',
    passport.authenticate("local",{
    failureRedirect:"/",
    failureFlash:true,
    successFlash:"Welcome to the site",
    successRedirect:"/users/profile",
}),(req,res)=>{
    // res.redirect("/users/profile")
});


router.get("/profile",(req,res)=>{
    res.render('profile', );

})  

module.exports=router