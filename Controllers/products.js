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
      productimage:  req.file.filename,
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
    product
      ? res.status(200).json({ product: product })
      : res.status(404).send({ message: "Product Not Found" });
  } catch (err) {
    res.status(500).end();
  }
};

exports.delete_single_product = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const customer = await Product.findByIdAndDelete(productId);
    customer
      ? res.status(200).json({ message: "Product Deleted" })
      : res.status(404).json({ message: "Product not found" });
    // Todo Also remove This product Increment form Product Category
  } catch (error) {
    res.status(500).end();
  }
};

exports.get_all_products = async (req, res, next) => {
  try {
    const products = await Product.find({});
    products
      ? res.status(200).json(products)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {}
};
