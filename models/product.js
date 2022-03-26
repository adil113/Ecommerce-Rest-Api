const mongoose = require("mongoose");
const productSchema = mongoose.Schema({ 
  productname: {
    type: String,
    required: true,
  },
  productprice: {
    type: String,
    required: true,
  },
  productcategory: {
    type: String,
    required: true,
  },
  productimage: { type: String, required: true },
  productdescription: { type: String, required: true },
  
});

module.exports = mongoose.model("Product", productSchema);
