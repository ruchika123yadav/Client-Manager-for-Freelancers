const Client =require("../models/client.js")


module.exports.clientForm=async(req,res)=>{
    res.render('clientform')
}

// module.exports.addClientInfo=async(req,res)=>{
// }