const Client =require("../models/client.js")
const User=require("../models/user.js")

module.exports.clientForm=async(req,res)=>{
    // const clientId=req.params.id
    // const client=await Client.findById(clientId).populate('userId')
    let error=req.flash('error');
    let success=req.flash('success');
    res.render('clientform',{success,error})
}

module.exports.addClientInfo = async (req, res) => {
  try {
    const newClient = new Client(req.body.client);
    await newClient.save();

    // Add client reference to user
    const user = await User.findById(req.user._id);
    user.clients.push(newClient._id);
    await user.save();

    req.flash("success", "Client added successfully!");
    res.redirect("/client/addproject");
  } catch (err) {
    console.error("Error adding client:", err);
    req.flash("error", "This email has already been taken!");
    res.status(500).redirect("/client/info");
  }
};

  

module.exports.addProject=async(req,res)=>{
    try {
      let error=req.flash('error');
      let success=req.flash('success');
        const clients = await Client.find({});
        res.render('addProject', { clients,success,error });
    } catch (err) {
        console.error("Error fetching clients:", err);
        res.status(500).send("Server Error");
    }
}