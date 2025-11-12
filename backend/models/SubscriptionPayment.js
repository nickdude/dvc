const mongoose = require('mongoose');

const subscriptionPaymentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
        razorpay_order_id: { type: String, required: true },
        razorpay_payment_id: { type: String },
        razorpay_signature: { type: String },
        amount: { type: Number, required: true }, // stored in paise
        currency: { type: String, default: 'INR' },
        status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending' },
        meta: { type: Object },
    },
    { timestamps: true }
);

module.exports = mongoose.model('SubscriptionPayment', subscriptionPaymentSchema);
