const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
const authenticate = require("../middlewares/auth"); // ✅ JWT auth
const { checkRole } = require("../middlewares/role"); // ✅ Role check

// Only superadmin can manage plans
router.post("/", authenticate, checkRole(["superadmin"]), planController.createPlan);
router.get("/", authenticate, checkRole(["superadmin", "admin", "user"]), planController.getPlans);
router.get("/:id", authenticate, checkRole(["superadmin", "admin"]), planController.getPlanById);
router.put("/:id", authenticate, checkRole(["superadmin"]), planController.updatePlan);
router.delete("/:id", authenticate, checkRole(["superadmin"]), planController.deletePlan);

module.exports = router;
