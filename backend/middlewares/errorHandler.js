const { errorResponse } = require("./response");

module.exports = (err, req, res, next) => {
    console.error(err);
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return errorResponse(res, message, status);
};
