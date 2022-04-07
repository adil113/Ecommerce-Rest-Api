const express = require("express");
const router = express.Router();
const customerController = require("../Controllers/users");


router.post("/signup", customerController.signup_new_customer);
router.get("/verify/:token", customerController.verify_customer_email);
router.post("/login", customerController.login_customer);
router.get("/:id", customerController.get_single_customer);
router.patch("/:id", customerController.update_single_customer);
router.delete("/:id", customerController.delete_single_customer);
router.get("/", customerController.get_all_customers);

module.exports = router;
