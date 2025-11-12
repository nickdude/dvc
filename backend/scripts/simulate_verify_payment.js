const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const axios = require('axios');
const crypto = require('crypto');

async function main() {
    const SERVER = process.env.SERVER_URL || 'http://localhost:5001';
    // replace these with values from your last order/test data
    const token = process.env.DEV_TEST_TOKEN || '';
    const orderId = process.env.DEV_LAST_ORDER_ID || '';
    const planId = process.env.DEV_PLAN_ID || '';

    if (!token || !orderId) {
        console.error('Provide DEV_TEST_TOKEN and DEV_LAST_ORDER_ID (or edit script)');
        process.exit(1);
    }

    const paymentId = 'pay_sim_' + Date.now();
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
        console.error('RAZORPAY_KEY_SECRET missing in .env');
        process.exit(1);
    }

    const signature = crypto.createHmac('sha256', keySecret).update(`${orderId}|${paymentId}`).digest('hex');

    try {
        const res = await axios.post(
            `${SERVER}/api/subscription/verify`,
            { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature, planId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('VERIFY RESPONSE:', res.data);
    } catch (err) {
        if (err.response) console.error('ERROR RESPONSE:', err.response.status, err.response.data);
        else console.error(err.message);
        process.exit(1);
    }
}

main();
