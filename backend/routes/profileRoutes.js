const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profileController");
const auth = require("../middlewares/auth");

// Public routes
router.get("/:slug", profileCtrl.getProfileBySlug);

// Protected routes
router.post("/", auth, profileCtrl.createOrUpdateProfile);
router.get("/me/profile", auth, profileCtrl.getMyProfile);
router.delete("/", auth, profileCtrl.deleteProfile);

module.exports = router;