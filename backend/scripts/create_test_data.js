const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const User = require('../models/User');
const Plan = require('../models/Plan');
const generateToken = require('../utils/generateToken');

async function main() {
    await connectDB();

    // create/find test user
    const email = process.env.DEV_TEST_EMAIL || 'dev_test_user@example.com';
    let user = await User.findOne({ email });
    if (!user) {
        user = new User({ name: 'Dev Tester', email, roles: ['user'] });
        await user.save();
        console.log('Created test user:', user._id.toString());
    } else {
        console.log('Found existing test user:', user._id.toString());
    }

    // create/find test plan
    const planTitle = 'Dev Plan';
    let plan = await Plan.findOne({ title: planTitle });
    if (!plan) {
        plan = new Plan({ title: planTitle, price: 99, subtitle: 'Dev plan', duration: 30 });
        await plan.save();
        console.log('Created test plan:', plan._id.toString());
    } else {
        console.log('Found existing test plan:', plan._id.toString());
    }

    const token = generateToken(user._id);

    console.log('\n=== TEST DATA ===');
    console.log('TOKEN=' + token);
    console.log('PLAN_ID=' + plan._id.toString());

    // close mongoose connection
    await mongoose.connection.close();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
