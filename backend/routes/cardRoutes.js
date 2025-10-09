const express = require("express");
const router = express.Router();
const cardCtrl = require("../controllers/cardController");
const auth = require("../middlewares/auth");

// protected
router.post("/", auth, cardCtrl.createCard);
router.get("/my", auth, cardCtrl.getMyCards);
router.put("/:id", auth, cardCtrl.updateCard);
router.delete("/:id", auth, cardCtrl.deleteCard);

// public
router.get("/:id", cardCtrl.getCardById);

module.exports = router;
