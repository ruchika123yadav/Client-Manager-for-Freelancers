const router=require('express').Router();
const clientController=require("../controllers/clientController.js")

const isLoggedIn=require("../middlewares/isLoggedIn.js")

const Client=require("../models/client.js")

router.get("/info",isLoggedIn,clientController.clientForm)

// router.post("/info",isLoggedIn,clientController.addClientInfo)

module.exports=router