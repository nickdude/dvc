const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const connectDB = require('../config/db');
const Plan = require('../models/Plan');
const SubscriptionPayment = require('../models/SubscriptionPayment');
const razorpayService = require('../services/razorpayService');

(async function () {
    try {
        await connectDB();
        const plan = await Plan.findOne({ title: 'Dev Plan' });
        console.log('plan:', !!plan, plan && plan._id.toString(), 'price:', plan && plan.price);
        const userId = '691496fb63bad4c010eb7195';
        const amountInPaise = Math.round((plan.price || 0) * 100);
        console.log('amountInPaise:', amountInPaise);
        const receipt = `rcpt_${String(userId).slice(-6)}_${String(Date.now()).slice(-5)}`;
        const order = await razorpayService.createOrder(amountInPaise, 'INR', receipt);
        console.log('order:', order);

        const payment = new SubscriptionPayment({
            user: userId,
            plan: plan._id,
            razorpay_order_id: order.id,
            amount: amountInPaise,
            currency: order.currency || 'INR',
            status: 'Pending',
            meta: { receipt },
        });
        const saved = await payment.save();
        console.log('saved payment:', saved);
        process.exit(0);
    } catch (err) {
        console.error('ERROR debug_create_order:', err);
        process.exit(1);
    }
})();
