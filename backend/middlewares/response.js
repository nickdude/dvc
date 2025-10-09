function successResponse(res, message = "Success", data = {}, status = 200) {
    return res.status(status).json({ status: "success", message: message, data: data });
}

function errorResponse(res, message = "Error", status = 400, errors = []) {
    return res.status(status).json({ status: "error", message: message, errors: errors });
}

module.exports = { successResponse, errorResponse };
