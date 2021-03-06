// const mongoose = require("mongoose");
const Product = require("../models/product");
const Category = require("../models/product_category");
const fs = require("fs");

exports.add_new_product = async (req, res, next) => {
  try {
    const { productname, productprice, productcategory, productdescription } =
      req.body;
    if (
      !(productname && productprice && productcategory && productdescription)
    ) {
      res.status(400).send({ message: "All inputs are required" });
    }

    const product = await Product.create({
      productname,
      productprice,
      productcategory,
      productimage: req.file.filename,
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
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.get_single_product = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    product
      ? res.status(200).json(product)
      : res.status(404).send({ message: "Product Not Found" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.get_all_products = async (req, res, next) => {
  try {
    const products = await Product.find({});
    products
      ? res.status(200).json(products)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.delete_single_product = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      await Category.findOneAndUpdate(
        { categoryName: product.productcategory },
        { $inc: { numberOfProducts: -1 } },
        { new: true }
      );

      res.status(200).json({ message: "Product Deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.update_single_product = async (req, res, next) => {
  let id = req.params.id;
  let updatedProduct;
  try {
    if (req.file == undefined) {
      updatedProduct = await Product.findByIdAndUpdate(id, {
        productname: req.body.productname,
        productprice: req.body.productprice,
        productcategory: req.body.productcategory,
        productdescription: req.body.productdescription,
      });
    } else {
      fs.unlink(`./uploads/${req.body.oldimagepath}`, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      updatedProduct = await Product.findByIdAndUpdate(id, {
        productname: req.body.productname,
        productprice: req.body.productprice,
        productcategory: req.body.productcategory,
        productimage: req.file.filename,
        productdescription: req.body.productdescription,
      });
    }

    updatedProduct
      ? res.status(200).json({ message: "Product Updated" })
      : res.status(404).send({ message: "Unable to update product" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
