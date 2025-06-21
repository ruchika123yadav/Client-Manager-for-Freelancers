const ejsMate = require('ejs-mate');
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const logger = require("morgan");
const methodOverride = require('method-override');
const path = require("path");

require('dotenv').config();

// Models
const userModel = require("./models/user.js");
const clientModel = require("./models/client.js");

// Database connection
const db = require('./config/index.js');

// Routers
const indexRouter = require("./routers/index.js");
const userRouter = require('./routers/users.js');
const clientRouter = require("./routers/client.js");
// const projectRouter = require("./routers/project.js"); // if separated

// View Engine Setup (using ejs-mate for layouts)
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Session
app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
}));

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: 'email' }, userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// Flash Messages
app.use(flash());

// Local Variables (for all views)
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Routes
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/client", clientRouter);
// app.use("/projects", projectRouter); // if you separated project logic

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
