const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin_user")

router.post('/add', adminController.add_new_admin)
router.post('/login', adminController.admin_login)
router.post('/token_verify', adminController.token_verify)

module.exports = router;