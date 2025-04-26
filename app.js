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
});
