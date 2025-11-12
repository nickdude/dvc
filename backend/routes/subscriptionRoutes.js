const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authenticate = require('../middlewares/auth');

// Create order (protected)
router.post('/order', authenticate, subscriptionController.createOrder);

// Verify payment after client-side success (protected)
router.post('/verify', authenticate, subscriptionController.verifyPayment);
module.exports = router;
