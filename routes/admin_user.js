const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin_user")

router.post('/add', adminController.add_new_admin)
router.post('/login', adminController.admin_login)

module.exports = router;