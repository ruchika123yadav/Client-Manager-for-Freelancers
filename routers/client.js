const router=require('express').Router();
const clientController=require("../controllers/clientController.js")

const isLoggedIn=require("../middlewares/isLoggedIn.js")

const Client=require("../models/client.js")

router.get("/info",isLoggedIn,clientController.clientForm)

router.post("/info",isLoggedIn,clientController.addClientInfo)

router.get("/addproject",isLoggedIn,clientController.addProject)
router.post('/addProjectPost',isLoggedIn,clientController.addProjectPost);
router.delete("/delete/:id",isLoggedIn,async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.redirect("/client/addproject");
  } catch (err) {
    console.error("Client deletion failed:", err);
    res.status(500).send("Error deleting client.");
  }
});

router.get("/info/:id",isLoggedIn, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate("projects");
    if (!client) return res.status(404).send("Client not found");

    res.render("clientProfile", { client });
  } catch (err) {
    console.error("Fetch client error:", err);
    res.status(500).send("Error loading client profile");
  }
});
module.exports=router