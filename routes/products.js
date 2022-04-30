const express = require("express");
const router = express.Router();
const productController = require("../Controllers/products");
const fileMiddleware = require("../middleware/file_upload");
const { verify_access_token } = require("../middleware/jwt_helper");

// Add New Product
router.post("/add", verify_access_token, fileMiddleware, productController.add_new_product);
router.get("/:id", verify_access_token, productController.get_single_product);
router.delete("/:id", verify_access_token,productController.delete_single_product);
router.put("/:id",verify_access_token, fileMiddleware, productController.update_single_product);
router.get("/", verify_access_token,productController.get_all_products);

module.exports = router;
