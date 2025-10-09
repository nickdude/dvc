// controllers/cardDesignController.js
const CardDesign = require("../models/CardDesign");
const { successResponse, errorResponse } = require("../middlewares/response");

// Create Card Design
exports.createCardDesign = async (req, res, next) => {
    try {
        const { name, type, description, price, image, isActive } = req.body;

        if (!name || !type || price === undefined || !image) {
            return errorResponse(res, "name, type, price and image are required", 400);
        }

        const cardDesign = await CardDesign.create({
            name,
            type,
            description,
            price,
            image,
            isActive: isActive !== undefined ? isActive : true,
        });

        return successResponse(res, "Card design created successfully", cardDesign, 201);
    } catch (err) {
        next(err);
    }
};

// Get all Card Designs
exports.getAllCardDesigns = async (req, res, next) => {
    try {
        const designs = await CardDesign.find().sort({ createdAt: -1 });
        return successResponse(res, "Card designs fetched successfully", designs);
    } catch (err) {
        next(err);
    }
};

// Get single Card Design
exports.getCardDesignById = async (req, res, next) => {
    try {
        const design = await CardDesign.findById(req.params.id);
        if (!design) return errorResponse(res, "Card design not found", 404);
        return successResponse(res, "Card design fetched successfully", design);
    } catch (err) {
        next(err);
    }
};

// Update Card Design
exports.updateCardDesign = async (req, res, next) => {
    try {
        const { name, type, description, price, image, isActive } = req.body;

        const updated = await CardDesign.findByIdAndUpdate(
            req.params.id,
            { name, type, description, price, image, isActive },
            { new: true, runValidators: true }
        );

        if (!updated) return errorResponse(res, "Card design not found", 404);
        return successResponse(res, "Card design updated successfully", updated);
    } catch (err) {
        next(err);
    }
};

// Delete Card Design
exports.deleteCardDesign = async (req, res, next) => {
    try {
        const deleted = await CardDesign.findByIdAndDelete(req.params.id);
        if (!deleted) return errorResponse(res, "Card design not found", 404);
        return successResponse(res, "Card design deleted successfully", null);
    } catch (err) {
        next(err);
    }
};
