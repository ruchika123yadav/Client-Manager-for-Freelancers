const express = require("express")
const app=express();
var cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('connect-flash')

app.set("view engine","ejs")

const path = require("path");
const logger = require("morgan");
require('dotenv').config()
const db=require('./config/index.js')
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(cookieParser());

app.use(express.urlencoded({extended:true}))

app.listen(process.env.PORT,(req,res)=>{
    console.log("Connected to the app")
})
