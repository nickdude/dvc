// routes/cardDesignRoutes.js
const express = require("express");
const router = express.Router();
const cardDesignCtrl = require("../controllers/cardDesignController");
const authenticate = require("../middlewares/auth"); // your auth middleware (sets req.user)
const { checkRole } = require("../middlewares/role");

// Create (superadmin, admin)
router.post("/", authenticate, checkRole(["superadmin"]), cardDesignCtrl.createCardDesign);

// List (any authenticated user)
router.get("/", cardDesignCtrl.getAllCardDesigns);

// Get single (any authenticated user)
router.get("/:id", authenticate, cardDesignCtrl.getCardDesignById);

// Update (superadmin, admin)
router.put("/:id", authenticate, checkRole(["superadmin"]), cardDesignCtrl.updateCardDesign);

// Delete (superadmin only)
router.delete("/:id", authenticate, checkRole(["superadmin"]), cardDesignCtrl.deleteCardDesign);

module.exports = router;
