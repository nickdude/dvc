const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const User = require('../models/User');
const Plan = require('../models/Plan');
const subscriptionController = require('../controllers/subscriptionController');

function makeRes() {
    let out = {};
    return {
        status(code) {
            out.statusCode = code;
            return this;
        },
        json(obj) {
            out.body = obj;
            console.log('RESPONSE:', JSON.stringify(out, null, 2));
            return out;
        },
    };
}

async function main() {
    await connectDB();

    const user = await User.findOne({ email: process.env.DEV_TEST_EMAIL || 'dev_test_user@example.com' });
    const plan = await Plan.findOne({ title: 'Dev Plan' });
    if (!user || !plan) {
        console.error('Test user or plan not found. Run create_test_data.js first.');
        process.exit(1);
    }

    console.log('Running createOrder...');
    const req1 = { user, body: { planId: plan._id.toString() } };
    const res1 = makeRes();
    await subscriptionController.createOrder(req1, res1);

    // Extract order id from db (SubscriptionPayment) or response - response printed above
    // For simplicity, find latest SubscriptionPayment for this user
    const SubscriptionPayment = require('../models/SubscriptionPayment');
    const payment = await SubscriptionPayment.findOne({ user: user._id }).sort({ createdAt: -1 });
    if (!payment) {
        console.error('No SubscriptionPayment record found');
        process.exit(1);
    }

    console.log('Found payment record:', payment.razorpay_order_id);

    console.log('Running verifyPayment (mock)...');
    const req2 = {
        user,
        body: {
            razorpay_order_id: payment.razorpay_order_id,
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_signature: 'MOCK_SIGNATURE',
            planId: plan._id.toString(),
        },
    };
    const res2 = makeRes();
    await subscriptionController.verifyPayment(req2, res2);

    await mongoose.connection.close();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
