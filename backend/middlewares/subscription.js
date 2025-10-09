// middlewares/subscription.js
module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            status: "error",
            message: "Not authenticated"
        });
    }

    // Always allow superadmin
    if (req.user.roles && req.user.roles.includes("superadmin")) {
        return next();
    }

    const sub = req.user.subscription;
    const now = Date.now();

    // Block if no subscription OR endDate missing OR expired
    if (!sub || !sub.plan || !sub.endDate || new Date(sub.endDate).getTime() < now) {
        return res.status(402).json({
            status: "error",
            message: "Subscription inactive or expired. Please renew to continue."
        });
    }

    // Passed check → continue
    next();
};
