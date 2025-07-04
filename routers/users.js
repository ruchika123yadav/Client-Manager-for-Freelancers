const express=require('express')
const router=express.Router();
const passport = require('passport');
const userController=require('../controllers/authController')
const User=require('../models/user')
const Project=require("../models/project")
const localStrategy = require('passport-local');
const isLoggedIn = require('../middlewares/isLoggedIn');
const upload=require('../config/multer-congif')
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
    const userWithClients = await req.user.populate({
      path: 'clients',
      populate: {
        path: 'projects' // Nested population
      }
    });

    res.render('profile.ejs', { user: userWithClients });
  } catch (err) {
    console.error("Error fetching user with clients:", err);
    req.flash("error", "Failed to load profile.");
    res.redirect("/");
  }
});
  router.get("/userprofile",isLoggedIn,async(req,res)=>{
    try {
      res.render('userprofile.ejs', { user: req.user});
    } catch (error) {
      req.flash("error", "Failed to load profile.");
      res.redirect("/");
    }
  })
  router.get("/edit-profile",isLoggedIn,async(req,res)=>{
    try {
      res.render('editprofile.ejs', { user: req.user });
    } catch (error) {
      req.flash("error", "Failed to load profile.");
      res.redirect("/");
    }
  })
  router.post("/profile",isLoggedIn,upload.single("picture"),async(req,res)=>{
    try {
    const { email, phoneNumber } = req.body;

    const updateFields = {
      email,
      phoneNumber
    };

    if (req.file) {
      updateFields.picture = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    await User.findByIdAndUpdate(req.user._id, updateFields, { new: true });

    res.redirect("/users/userprofile"); // or profile page
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send("Server error");
  }
  })
router.get("/logout",isLoggedIn,userController.logoutUser);

router.post("/project/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) {
      req.flash("error", "Project not found.");
      return res.redirect("/users/profile");
    }

    project.isCompleted = isCompleted === "true";
    await project.save();

    req.flash("success", `Marked as ${project.isCompleted ? "Completed" : "Incomplete"}.`);
    res.redirect("/users/profile");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("/users/profile");
  }
});

module.exports=router