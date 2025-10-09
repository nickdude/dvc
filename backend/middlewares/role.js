module.exports.checkRole = (allowed) => {

    return (req, res, next) => {
        if (!req.user || !req.user.roles) {
            return res.status(403).json({ status: "error", message: "Access denied" });
        }
        const allowedArr = Array.isArray(allowed) ? allowed : [allowed];
        const has = req.user.roles.some((r) => allowedArr.includes(r));
        if (!has) return res.status(403).json({ status: "error", message: "Insufficient permissions" });
        next();
    };
};
