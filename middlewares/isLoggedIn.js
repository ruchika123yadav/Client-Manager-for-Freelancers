const passport = require('passport');

module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        // Set current session user to logged-in user
        res.locals.user = req.user; // this will make the user available in your views (ejs)

        return next(); // proceed to the next route handler
    } else {
        req.flash("error", "You need to login first");
        res.redirect('/login'); // Redirect to login page
    }
}
