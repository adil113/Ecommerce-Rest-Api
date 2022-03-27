const express = require("express");
const router = express.Router();
const customerController = require("../Controllers/users");


router.post("/signup", customerController.signup_new_customer);
router.post("/login", customerController.login_customer);
router.get("/:id", customerController.get_single_customer);
router.patch("/:id", customerController.update_single_customer);
router.delete("/:id", customerController.delete_single_customer);

module.exports = router;
