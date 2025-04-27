const User = require('../models/user');
const passport=require('passport')
const localStrategy = require('passport-local');
passport.use(new localStrategy(User.authenticate()));

module.exports.signupUser = async (req, res) => {
    try {
        const { fullName, email, password, role, phoneNumber } = req.body;
        if (!fullName || !email || !password || !role || !phoneNumber) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const newUser = new User({ fullName, email, role, phoneNumber });

        await User.register(newUser, password)
            .then((regUser) => {
                req.login(regUser, (err) => {
                    if (err) {
                        console.error("Login error after signup:", err);
                        return res.status(500).send("Login failed after signup.");
                    }
                    return res.redirect('/users/profile');
                });
            });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(400).send("Signup failed: " + err.message);
    }
};


// module.exports.loginUser = async (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         console.log(user);
        
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             req.flash('error', 'Invalid username or password');
//             return res.redirect('/');
//         }
//         req.login(user, (err) => {
//             if (err) {
//                 return next(err);
//             }
//             req.flash('success', 'Welcome back!');
//             return res.redirect('/users/profile');
//         });
//     })(req, res, next);
// };




module.exports.logoutUser=async(req,res)=>{
    req.logout((err)=>{
        if(err){
          console.log(err);
        }
        req.flash("success","Logged out successfully")
        res.redirect('/')
      })
}