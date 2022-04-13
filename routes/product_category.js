const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/product_category");

// TODO  Will add image for category later
const multer = require("multer");

// ! Add new category
router.post("/add", async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName)
      return res.status(400).json({ message: "All inputs are required" });

    const categoryExists = await Category.findOne({
      categoryName: categoryName,
    });

    if (categoryExists)
      return res
        .status(409)
        .json({ message: `${categoryName} already exists` });

    await Category.create({
      categoryName: categoryName,
    });

    res.status(200).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    categories
      ? res.status(200).json(categories)
      : res.status(404).send({ message: "No Categories Found" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

module.exports = router;
