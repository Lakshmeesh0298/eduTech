const {profileController, addtocartController, getuserController } = require("../controllers/profileController")
const express = require("express");
const { protection, authorize } = require("../helpers/authProtect");
const router = express.Router();

router.post("/profile",protection,authorize("user"),profileController);
router.put("/:id/add",addtocartController);
router.get('/getusers', getuserController)

module.exports = router;