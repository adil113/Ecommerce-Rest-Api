const mongoose = require("mongoose");

const product = mongoose.Schema({ 
  productName: {
    type: "string",
    required: true,
  },
  productPrice: {
    type: "string",
    required: true,
  },
  productCategory: {
    type: "string",
    required: true,
  },
  productimage: { type: String, required: true },
  productdescription: { type: String, required: true },
  
});
