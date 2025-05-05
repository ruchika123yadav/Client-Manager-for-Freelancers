const Client =require("../models/client.js")


module.exports.clientForm=async(req,res)=>{
    // const clientId=req.params.id
    // const client=await Client.findById(clientId).populate('userId')
    let error=req.flash('error');
    let success=req.flash('success');
    res.render('clientform',{success,error})
}

module.exports.addClientInfo = async (req, res) => {
    try {
    //   let { name, email, notes, company, phone } = req.body;
    //   await Client.create({ name, email, notes, company, phone });
    const newClient=new Client(req.body.client);
    newClient.userId=req.user._id
    await newClient.save()
    console.log(newClient)
    req.flash("success",'Client added successfully!')
    res.redirect("/client/addproject");
    } catch (err) {
      req.flash("error",'This email has already been taken!')
      console.error("Error adding client:", err);
      res.status(500).redirect("/client/info").json({ error: "Internal server error" });
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