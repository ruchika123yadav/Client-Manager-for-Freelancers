const Client =require("../models/client.js")
const User=require("../models/user.js")
const Project=require("../models/project.js")

module.exports.clientForm=async(req,res)=>{
    // const clientId=req.params.id
    // const client=await Client.findById(clientId).populate('userId')
    let error=req.flash('error');
    let success=req.flash('success');
    res.render('clientForm',{success,error})
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

module.exports.addProjectPost= async (req, res) => {
  try {
    const {
      clientId,
      title,
      description,
      deadline,
      paymentStatus,
      amount,
      isCompleted
    } = req.body;

    const newProject = new Project({
      clientId,
      title,
      description,
      deadline: deadline || null,
      paymentStatus,
      amount: amount || 0,
      isCompleted: isCompleted === 'on' ? true : false
    });
    
    await newProject.save();
    // Add project reference to client
    const client = await Client.findById(clientId);
    if (!client) {
      req.flash("error", "Client not found.");
      return res.redirect("/client/addproject");
    }
    client.projects.push(newProject._id);
    await client.save();
    res.render("addProject", {
      clients: await Client.find(), // so dropdown remains populated
      success: "Project added successfully!",
      error: ""
    });

  } catch (err) {
    console.error("❌ Error adding project:", err.message);
    res.render("addProject", {
      clients: await Client.find(),
      success: "",
      error: "Failed to add project. Please try again."
    });
  }
}