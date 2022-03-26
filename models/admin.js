const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },

  email: {
    type: "string",
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: "string",
    required: true,
  },
  status: {
    type: "string",
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "superAdmin"],
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
