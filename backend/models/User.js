// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String }, // null for Google users

        // roles as array (use "superadmin", "admin", "user")
        roles: {
            type: [String],
            enum: ['superadmin', 'admin', 'user'],
            default: ['user'],
        },

        // subscription
        subscription: {
            plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
            startDate: { type: Date },
            endDate: { type: Date },
        },

        // google
        googleId: { type: String },

        // verification & reset tokens (stored hashed)
        verificationToken: { type: String },
        verificationExpires: { type: Date },

        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },

        // profile details
        companyName: { type: String },
        phone: { type: String },
        avatarUrl: { type: String },
        bio: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
