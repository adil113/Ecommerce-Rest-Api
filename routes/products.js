const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const productController = require("../Controllers/products")
const {verify_access_token} = require("../middleware/jwt_helper")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
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
router.post("/add", verify_access_token, upload.single("productimage"), productController.add_new_product);
router.get("/:id",  productController.get_single_product);
router.delete("/:id",  productController.delete_single_product);
router.get("/",  productController.get_all_products);


module.exports = router;
