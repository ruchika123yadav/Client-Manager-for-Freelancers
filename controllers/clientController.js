const Client =require("../models/client.js")


module.exports.clientForm=async(req,res)=>{
    res.render('clientform')
}

module.exports.addClientInfo=async(req,res)=>{
    let newClient =req.body
    const client= new Client(newClient)
    await client.save()
    res.redirect("/clients/addproject")
}

module.exports.addProject=async(req,res)=>{
    res.render('addProject')
}