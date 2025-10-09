const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");
const authenticate = require("../middlewares/auth"); // ✅ JWT auth

// register & verify
router.post("/register", authCtrl.register);
router.get("/verify-email", authCtrl.verifyEmail);
router.get("/verify-token", authenticate, authCtrl.verifyToken);

// login
router.post("/login", authCtrl.login);

// google login (client should send { idToken })
router.post("/google", authCtrl.googleLogin);

// forgot / reset
router.post("/forgot-password", authCtrl.forgotPassword);
router.post("/reset-password/:token", authCtrl.resetPassword);

module.exports = router;
