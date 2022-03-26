const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Product = require("../models/product");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
    console.log(file);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    return cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});


// Add New Product
router.post("/add", upload.single("productimage"), async (req, res, next) => {
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
});

module.exports = router;
