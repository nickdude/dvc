const Plan = require('../models/Plan');
const { successResponse, errorResponse } = require('../middlewares/response.js');

// Create Plan
exports.createPlan = async (req, res) => {
    try {
        const { title, price, subtitle, duration } = req.body;

        if (!title || !price || !duration) {
            return errorResponse(res, "Title, Price, and Duration are required", 400);
        }

        const plan = await Plan.create({ title, price, subtitle, duration });
        return successResponse(res, "Plan created successfully", plan, 200);
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

// Get All Plans
exports.getPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        return successResponse(res, "Plans fetched successfully", plans, 200);
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

// Get Plan by ID
exports.getPlanById = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if (!plan) return errorResponse(res, "Plan not found", 404);
        return successResponse(res, plan, "Plan fetched successfully");
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

// Update Plan
exports.updatePlan = async (req, res) => {
    try {
        const { title, price, subtitle, duration } = req.body;
        const plan = await Plan.findByIdAndUpdate(
            req.params.id,
            { title, price, subtitle, duration },
            { new: true }
        );
        if (!plan) return errorResponse(res, "Plan not found", 404);
        return successResponse(res, plan, "Plan updated successfully");
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

// Delete Plan
exports.deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findByIdAndDelete(req.params.id);
        if (!plan) return errorResponse(res, "Plan not found", 404);
        return successResponse(res, null, "Plan deleted successfully");
    } catch (error) {
        return errorResponse(res, error.message);
    }
};
