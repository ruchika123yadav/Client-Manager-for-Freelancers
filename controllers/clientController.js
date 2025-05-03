const Client =require("../models/client.js")


module.exports.clientForm=async(req,res)=>{
    res.render('clientform')
}

module.exports.addClientInfo = async (req, res) => {
    try {
      let { name, email, notes, company, phone } = req.body;
    
  
      await Client.create({ name, email, notes, company, phone });
  
      res.redirect("/client/addproject");
    } catch (err) {
      console.error("Error adding client:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

module.exports.addProject=async(req,res)=>{
    res.render('addProject')
}