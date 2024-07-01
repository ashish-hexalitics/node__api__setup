const express = require("express");
const router = express.Router();
const AccountController = require("@controllers/account");
const withFullUser = require("@middleware/withFullUser.js");

router.post("/create/admin", [withFullUser], AccountController.addAdminUser);
// Define other account-related routes here

module.exports = router;
