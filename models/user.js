const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   match:
  //     /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
   
  },
  password: {
    type: String,
    required: true,
  },
  verificationToken: {
    type: String,
    
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
