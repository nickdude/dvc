const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorResponse } = require("./response");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        if (!token) return errorResponse(res, "No token provided", 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password -resetPasswordToken -verificationToken");
        if (!user) return errorResponse(res, "User not found", 401);

        req.user = user;
        next();
    } catch (err) {
        return errorResponse(res, "Invalid or expired token", 401);
    }
};
