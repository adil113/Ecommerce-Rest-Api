const mongoose = require("mongoose");
const productSchema = mongoose.Schema({ 
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

module.exports = mongoose.model("Product", productSchema);
