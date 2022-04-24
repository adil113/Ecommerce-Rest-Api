const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },

  email: {
    type: "string",
    required: true,
    
  },
  password: {
    type: "string",
    required: true,
  },
  status: {
    type: Boolean,
  },
  role: {
    type: String,
    enum: ["Admin", "SuperAdmin"],
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
