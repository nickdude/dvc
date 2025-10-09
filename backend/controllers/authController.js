const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const { sendMail } = require("../services/mailService");
const hashToken = require("../utils/hashToken");
const generateToken = require("../utils/generateToken");
const { successResponse, errorResponse } = require("../middlewares/response");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "");

// register
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, roles = ["user"], companyName, phone } = req.body;
        console.log(req.body);
        if (!name || !email || !password || !phone) return errorResponse(res, "name, email, password and phone are required", 400);

        const existing = await User.findOne({ email });
        if (existing) return errorResponse(res, "Email already in use", 400);

        const hashed = await bcrypt.hash(password, 10);

        const rawToken = crypto.randomBytes(32).toString("hex");
        const vTokenHashed = hashToken(rawToken);

        const user = new User({
            name,
            email,
            password: hashed,
            roles,
            phone,
            companyName,
            verificationToken: vTokenHashed,
            verificationExpires: Date.now() + 24 * 3600 * 1000,
        });
        await user.save();

        const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`;
        await sendMail(email, "Verify your email", `<p>Hi ${name}, <a href="${verifyUrl}">click to verify</a></p>`);

        return successResponse(res, "Registered. Check your email to verify.");
    } catch (err) {
        next(err);
    }
};

// verify email
exports.verifyEmail = async (req, res, next) => {
    try {
        const token = req.query.token || req.params.token;
        if (!token) return errorResponse(res, "token required", 400);

        const hashed = hashToken(token);
        const user = await User.findOne({ verificationToken: hashed, verificationExpires: { $gt: Date.now() } });
        if (!user) return errorResponse(res, "Invalid or expired token", 400);

        user.verificationToken = undefined;
        user.verificationExpires = undefined;
        // mark verified (you can use a separate flag if you like)
        await user.save();

        return successResponse(res, "Email verified successfully");
    } catch (err) {
        next(err);
    }
};

// verify JWT token (for persistent login)
exports.verifyToken = async (req, res, next) => {
    try {
        return successResponse(res, "Token is valid", { user: req.user });
    } catch (err) {
        next(err);
    }
};


// login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return errorResponse(res, "email and password required", 400);

        const user = await User.findOne({ email });

        if (user.verificationToken) {
            return errorResponse(res, "Please verify your email before logging in", 403);
        }
        if (!user) return errorResponse(res, "Invalid credentials", 400);
        if (!user.password) return errorResponse(res, "Use Google login", 400);

        const match = await bcrypt.compare(password, user.password);
        if (!match) return errorResponse(res, "Invalid credentials", 400);

        const token = generateToken(user._id);
        return successResponse(res, "Login successful", { token, user: { id: user._id, name: user.name, email: user.email, roles: user.roles, subscription: user.subscription } });
    } catch (err) {
        next(err);
    }
};

// google login (client sends idToken)
exports.googleLogin = async (req, res, next) => {
    try {
        const { idToken } = req.body;
        if (!idToken) return errorResponse(res, "idToken required", 400);

        const ticket = await googleClient.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload(); // email, name, sub

        let user = await User.findOne({ email: payload.email });

        if (!user) {
            user = new User({
                name: payload.name || payload.email.split("@")[0],
                email: payload.email,
                googleId: payload.sub,
                // google users considered verified; roles default to ["user"]
            });
            await user.save();
        } else if (!user.googleId) {
            user.googleId = payload.sub;
            await user.save();
        }

        const token = generateToken(user._id);
        return successResponse(res, "Google login successful", { token, user: { id: user._id, name: user.name, email: user.email, roles: user.roles } });
    } catch (err) {
        next(err);
    }
};

// forgot password
exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return errorResponse(res, "email required", 400);

        const user = await User.findOne({ email });
        if (!user) return errorResponse(res, "User not found", 404);

        const raw = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = hashToken(raw);
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${raw}`;
        await sendMail(email, "Reset your password", `<p>Click to reset: <a href="${resetUrl}">${resetUrl}</a></p>`);

        return successResponse(res, "Password reset email sent");
    } catch (err) {
        next(err);
    }
};

// reset password
exports.resetPassword = async (req, res, next) => {
    try {
        const token = req.params.token || req.query.token;
        const { password } = req.body;
        if (!token) return errorResponse(res, "token required", 400);
        if (!password) return errorResponse(res, "password required", 400);

        const hashed = hashToken(token);
        const user = await User.findOne({ resetPasswordToken: hashed, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) return errorResponse(res, "Invalid or expired token", 400);

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return successResponse(res, "Password reset successful");
    } catch (err) {
        next(err);
    }
};
