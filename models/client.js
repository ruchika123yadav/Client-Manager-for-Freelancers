const mongoose = require("mongoose");
const Projects = require("./project.js");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String
  },
  company: {
    type: String
  },
  notes: {
    type: String
  }, // personal notes about client
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }]
}, {
  timestamps: true
});

// Middleware to delete related projects when a client is deleted
clientSchema.pre("findOneAndDelete", async function (next) {
  try {
    const client = await this.model.findOne(this.getFilter());
    if (client && client.projects.length > 0) {
      await Projects.deleteMany({ _id: { $in: client.projects } });
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Client", clientSchema);
