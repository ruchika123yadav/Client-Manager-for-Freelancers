const express=require('express')
const router=express.Router();
const passport = require('passport');
const userController=require('../controllers/authController')
const User=require('../models/user')
const localStrategy = require('passport-local');
const isLoggedIn = require('../middlewares/isLoggedIn');
passport.use(new localStrategy(User.authenticate()));

router.post("/signup", userController.signupUser);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users/profile',
    failureRedirect: '/',
    failureFlash: true,
    successFlash: 'Welcome!'
}),(req,res)=>{});

router.get("/profile", isLoggedIn, async (req, res) => {
  try {
    const userWithClients = await User.findById(req.user._id).populate('clients') ;
    res.render('profile', { user: userWithClients });
  } catch (err) {
    console.error("Error fetching user with clients:", err);
    req.flash("error", "Failed to load profile.");
    res.redirect("back");
  }
});



router.get("/logout",isLoggedIn,userController.logoutUser);
module.exports=router