const mongoose = require("mongoose");
const Product = require("../models/product");
const Category = require("../models/product_category");
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

    if (product) {
      await Category.findOneAndUpdate(
        { categoryName: req.body.productcategory },
        { $inc: { numberOfProducts: 1 } },
        { new: true }
      );
      res.status(201).json(product);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.get_single_product = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).send({ message: "Product Not Found" });
    return res.status(200).json({ product: product });
  } catch (err) {
    res.status(500).end();
  }
};
