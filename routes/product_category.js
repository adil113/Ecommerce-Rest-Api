const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/product_category");
const categoryController = require("../Controllers/product_category");
const { verify_access_token } = require("../middleware/jwt_helper");

// ! Add new category
router.post("/add",categoryController.add_new_category);

router.get("/", categoryController.get_all_Categories);

module.exports = router;
