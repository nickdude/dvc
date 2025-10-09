const express = require("express");
const router = express.Router();
const userPlanController = require("../controllers/userPlanController");
const authenticate = require("../middlewares/auth");
const { checkRole } = require("../middlewares/role");

// User APIs
router.post("/", authenticate, checkRole(["admin", "user"]), userPlanController.buyPlan);
router.get("/me", authenticate, checkRole(["admin", "user"]), userPlanController.getMyPlans);
router.put("/:id/cancel", authenticate, checkRole(["admin", "user"]), userPlanController.cancelPlan);

// Admin APIs
router.get("/", authenticate, checkRole(["superadmin"]), userPlanController.getAllUserPlans);

module.exports = router;
