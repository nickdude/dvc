const mongoose = require("mongoose");

const userPlanSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        plan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan",
            required: true,
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
            required: true, // auto-calc from duration of plan
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Completed", "Failed", "Cancelled"],
            default: "Pending",
        },
        transactionId: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserPlan", userPlanSchema);
