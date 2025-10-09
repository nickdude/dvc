const express = require("express");
const router = express.Router();
const cardTemplateCtrl = require("../controllers/cardTemplateController");
const auth = require("../middlewares/auth");

// Public routes
router.get("/", cardTemplateCtrl.getAllTemplates);

// Protected routes (admin only)
router.post("/", auth, cardTemplateCtrl.createTemplate);
router.put("/:id", auth, cardTemplateCtrl.updateTemplate);
router.delete("/:id", auth, cardTemplateCtrl.deleteTemplate);

module.exports = router;