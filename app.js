<<<<<<< HEAD
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const logger = require("morgan");
const path = require("path");
// const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const ejsMate=require('ejs-mate')

// Models
const userModel = require("./models/user.js");
const clientModel = require("./models/client.js");

// Database connection
const db = require('./config/index.js');

// Routers
const indexRouter = require("./routers/index.js");
const userRouter = require('./routers/users.js');

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine("ejs",ejsMate)

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

// Routes
app.use("/", indexRouter);
app.use("/users", userRouter);

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
=======
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
require('dotenv').config();

// Models
const userModel = require('./models/user');
const clientModel = require('./models/client');

// Database Config
const db = require('./config/index');

// Routers
const indexRouter = require('./routers/index');
const userRouter = require('./routers/users');

// =======================
// Middleware Setup
// =======================

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =======================
// Session and Passport Setup
// =======================

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport Local Strategy
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// (Optional, but clean: no need to reinitialize LocalStrategy again below)

// =======================
// Routes
// =======================

app.use('/', indexRouter);
app.use('/users', userRouter);

// =======================
// Server Start
// =======================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
>>>>>>> 20de36b2d15bd9ad60ee182f4607e1f96a6c774e
});
