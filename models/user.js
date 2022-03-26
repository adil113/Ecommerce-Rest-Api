const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  firstName: {
    type: "string",
    required: true,
  },
  lastName: {
    type: "string",
    required: true,
  },
  userName: {
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
    default: false,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
