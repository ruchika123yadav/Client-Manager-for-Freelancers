const router=require('express').Router();
const clientController=require("../controllers/clientController.js")

const isLoggedIn=require("../middlewares/isLoggedIn.js")

const Client=require("../models/client.js")

router.get("/:id/info",isLoggedIn,clientController.clientForm)

router.post("/:id/info",isLoggedIn,clientController.addClientInfo)

router.get("/addproject",isLoggedIn,clientController.addProject)

module.exports=router