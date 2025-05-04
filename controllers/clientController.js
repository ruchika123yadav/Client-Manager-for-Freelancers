const Client =require("../models/client.js")


module.exports.clientForm=async(req,res)=>{
    const clientId=req.params.id
    const client=await Client.findById(clientId).populate('userId')
    res.render('clientform',{ clientId })
}

module.exports.addClientInfo = async (req, res) => {
    try {
        // const { name, email, notes, company, phone } = req.body;
           console.log(req.body)
        // await Client.create({ name, email, notes, company, phone });
        const newClient = new Client(req.body.client)
         newClient.userId=req.user._id
          await newClient.save();
        console.log("Client added successfully:", newClient);
        res.redirect("/clients/addproject");
    } catch (err) {
        console.error("Error adding client:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports.addProject=async(req,res)=>{
    res.render('addProject')
}