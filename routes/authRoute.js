const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  getCurrentUserController,
} = require("../controllers/authController");
const { userAuthenticationMiddlerware } = require("../middleware/authMiddleware");

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/current-user", userAuthenticationMiddlerware, getCurrentUserController);

module.exports = router;
