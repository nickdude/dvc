const Razorpay = require('razorpay');
const crypto = require('crypto');

const keyId = process.env.RAZORPAY_KEY_ID || '';
const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

if (!keyId || !keySecret || keyId.toLowerCase().startsWith('your') || keySecret.toLowerCase().startsWith('your')) {
    console.warn('⚠️  Razorpay keys are missing or placeholders in .env. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET for live integration.');
}

const instance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
});

async function createOrder(amount, currency = 'INR', receipt = undefined) {
    if (!keyId || !keySecret) {
        throw new Error('Razorpay keys are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env');
    }

    const options = { amount, currency };
    if (receipt) options.receipt = receipt;
    return await instance.orders.create(options);
}

function verifyPaymentSignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    if (!keySecret) {
        throw new Error('Razorpay key secret not configured; cannot verify signature');
    }
    const generated_signature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    return generated_signature === razorpay_signature;
}

function verifyWebhookSignature(rawBody, signature) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
        console.warn('⚠️  RAZORPAY_WEBHOOK_SECRET not set; webhook verification will fail.');
        return false;
    }
    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    return expected === signature;
}

module.exports = {
    createOrder,
    verifyPaymentSignature,
    verifyWebhookSignature,
};
