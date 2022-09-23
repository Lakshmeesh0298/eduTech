const {profileController } = require("../controllers/profileController")
const express = require("express");
const { protection, authorize } = require("../helpers/authProtect");
const router = express.Router();

router.post("/profile",protection,authorize("user"),profileController);

module.exports = router;