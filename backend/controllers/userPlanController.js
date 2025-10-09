const Plan = require("../models/Plan");
const UserPlan = require("../models/UserPlan");
const { successResponse, errorResponse } = require("../middlewares/response");
const User = require("../models/User");

// Buy a plan
const buyPlan = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user._id;

        const plan = await Plan.findById(planId);
        if (!plan) return errorResponse(res, "Plan not found", 404);

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + plan.duration);

        const userPlan = new UserPlan({
            user: userId,
            plan: planId,
            startDate,
            endDate,
            paymentStatus: "Completed", // TODO: later integrate Razorpay/Stripe
        });

        await userPlan.save();
        return successResponse(res, "Plan purchased successfully", userPlan, 201);
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

// Get logged-in user’s plans
const getMyPlans = async (req, res) => {
    try {
        const userId = req.user._id;
        const plans = await UserPlan.find({ user: userId }).populate("plan");
        return successResponse(res, "Fetched user plans", plans);
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

// Cancel a plan
const cancelPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const plan = await UserPlan.findOne({ _id: id, user: userId });
        if (!plan) return errorResponse(res, "Plan not found", 404);

        plan.paymentStatus = "Cancelled";
        await plan.save();

        return successResponse(res, "Plan cancelled successfully", plan);
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

// Admin - List all user plan purchases
const getAllUserPlans = async (req, res) => {
    try {
        const usersWithPlans = await User.aggregate([
            {
                $match: {
                    roles: { $ne: "superadmin" } // exclude superadmin users
                }
            },
            {
                $lookup: {
                    from: "userplans", // collection name of UserPlan
                    localField: "_id",
                    foreignField: "user",
                    as: "userPlans"
                }
            },
            { $unwind: { path: "$userPlans", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "plans", // collection name of Plan
                    localField: "userPlans.plan",
                    foreignField: "_id",
                    as: "plan"
                }
            },
            { $unwind: { path: "$plan", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: "$userPlans._id", // null if no plan exists
                    user: {
                        _id: "$_id",
                        name: "$name",
                        email: "$email",
                        roles: "$roles"
                    },
                    plan: {
                        _id: "$plan._id",
                        title: "$plan.title",
                        price: "$plan.price",
                        duration: "$plan.duration"
                    },
                    startDate: "$userPlans.startDate",
                    endDate: "$userPlans.endDate",
                    paymentStatus: "$userPlans.paymentStatus",
                    createdAt: "$userPlans.createdAt",
                    updatedAt: "$userPlans.updatedAt",
                    __v: "$userPlans.__v"
                }
            }
        ]);

        return successResponse(res, "Fetched all user plans", usersWithPlans);
    } catch (error) {
        return errorResponse(res, error.message);
    }
};



module.exports = {
    buyPlan,
    getMyPlans,
    cancelPlan,
    getAllUserPlans,
};
