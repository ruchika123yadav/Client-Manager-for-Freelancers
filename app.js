const express = require("express")
const app=express();
var cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('connect-flash')
var passport = require('passport');
const userModel=require("./models/user.js")
const clientModel=require("./models/client.js")
const path = require("path");
const logger = require("morgan");

const db=require('./config/index.js')
const indexRouter=require("./routers/index.js")
const userRouter=require('./routers/users')
const LocalStrategy=require("passport-local");

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, 'public')));
app.set("views",path.join(__dirname,'views'))
app.use(express.json())
app.use(cookieParser());


app.use(session({
    resave: false,
    saveUninitialized:false,
    secret:"mysecret",
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(userModel.createStrategy());
  passport.serializeUser(userModel.serializeUser());
  passport.deserializeUser(userModel.deserializeUser());
  app.use(flash());
  passport.use(new LocalStrategy(userModel.authenticate()));


require('dotenv').config()
app.use(logger('dev'));



app.use(express.urlencoded({extended:true}))



app.use("/",indexRouter)
app.use("/users",userRouter)





app.listen(process.env.PORT,(req,res)=>{
    console.log("Connected to the app")
})

