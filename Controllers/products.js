const mongoose = require("mongoose");
const Product = require("../models/product");



exports.add_new_product = async (req, res, next) => {
    try {
        const { productname, productprice, productcategory, productdescription } =
          req.body;
        if (
          !(productname && productprice && productcategory && productdescription)
        ) {
          res.status(400).send({ message: "All input is required" });
        }
    
        const product = await Product.create({
          productname,
          productprice,
          productcategory,
          productimage: req.file.path,
          productdescription,
        });
        res.status(201).json(product);
      } catch (err) {
        console.log(err);
      }    

}