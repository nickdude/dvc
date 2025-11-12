const Plan = require('../models/Plan');
const UserPlan = require('../models/UserPlan');
const SubscriptionPayment = require('../models/SubscriptionPayment');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../middlewares/response');
const razorpayService = require('../services/razorpayService');

// Create a Razorpay order for a plan
const createOrder = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user._id;

        const plan = await Plan.findById(planId);
        if (!plan) return errorResponse(res, 'Plan not found', 404);

        const amountInPaise = Math.round(plan.price * 100);
        // razorpay receipt must be <= 40 chars. Generate a short receipt id.
        const receipt = `rcpt_${String(userId).slice(-6)}_${String(Date.now()).slice(-5)}`;

        const order = await razorpayService.createOrder(amountInPaise, 'INR', receipt);

        // create a pending SubscriptionPayment entry
        const payment = new SubscriptionPayment({
            user: userId,
            plan: planId,
            razorpay_order_id: order.id,
            amount: amountInPaise,
            currency: order.currency || 'INR',
            status: 'Pending',
            meta: { receipt },
        });
        await payment.save();

        return successResponse(res, 'Order created', { order, keyId: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
        // Razorpay SDK returns structured errors under error.error
        const message = (error && error.error && error.error.description) || error.message || String(error);
        return errorResponse(res, message, 400, error);
    }
};

// Verify payment signature sent from frontend after payment
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;
        const userId = req.user._id;

        // signature verification
        const valid = razorpayService.verifyPaymentSignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
        if (!valid) return errorResponse(res, 'Invalid payment signature', 400);

        // find pending payment
        const payment = await SubscriptionPayment.findOne({ razorpay_order_id });
        if (!payment) return errorResponse(res, 'Payment record not found', 404);

        payment.razorpay_payment_id = razorpay_payment_id;
        payment.razorpay_signature = razorpay_signature;
        payment.status = 'Completed';
        await payment.save();

        // create a UserPlan and update user's subscription
        const plan = await Plan.findById(payment.plan || planId);
        if (!plan) return errorResponse(res, 'Plan not found', 404);

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + (plan.duration || 30));

        const userPlan = new UserPlan({
            user: userId,
            plan: plan._id,
            startDate,
            endDate,
            paymentStatus: 'Completed',
            transactionId: razorpay_payment_id,
        });
        await userPlan.save();

        // update user's subscription (this is used by existing subscription middleware)
        await User.findByIdAndUpdate(userId, {
            subscription: {
                plan: plan._id,
                startDate,
                endDate,
            },
        });

        return successResponse(res, 'Payment verified and subscription activated', { userPlan, payment });
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

// Webhook handler (optional). Razorpay sends signature in header 'x-razorpay-signature'.
// Note: For more robust verification, configure express.raw for this route so verification uses raw body bytes.
const webhookHandler = async (req, res) => {
    try {
        const signature = req.headers['x-razorpay-signature'];

        // req.body may be a Buffer when using express.raw for this route.
        let rawBody;
        if (Buffer.isBuffer(req.body)) {
            rawBody = req.body.toString('utf8');
        } else {
            rawBody = JSON.stringify(req.body);
        }

        if (!razorpayService.verifyWebhookSignature(rawBody, signature)) {
            return res.status(400).send('Invalid signature');
        }

        const event = typeof req.body === 'string' ? JSON.parse(req.body).event : req.body.event;
        // Handle events like payment.captured, payment.failed etc.
        // For payment.captured, we can mark payment completed and create subscription similar to verify endpoint.
        // Simple ack for now
        res.json({ status: 'ok' });
    } catch (error) {
        res.status(500).send('error');
    }
};

module.exports = { createOrder, verifyPayment, webhookHandler };
