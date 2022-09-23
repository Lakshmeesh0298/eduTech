const express = require('express')
const {
  registerController,
  userLoginController,
  logoutController,
  forgotController,
  resetPassword,
  changePassword,
} = require("../controllers/authController");
const { protection, authorize } = require("../helpers/authProtect");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", userLoginController);
router.get("/logout", protection, authorize("user"), logoutController);
router.post("/forgot-password", forgotController);
router.put("/reset-password", resetPassword);
router.put("/change-password", protection, authorize("user"), changePassword);

module.exports = router;
