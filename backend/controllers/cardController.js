const Card = require("../models/Card");
const { successResponse, errorResponse } = require("../middlewares/response");
const mongoose = require("mongoose");

// create card (self or team)
exports.createCard = async (req, res, next) => {
    try {
        // Debug: log incoming payload keys for troubleshooting
        try {
            console.log('[cardController.createCard] user:', req.user && req.user._id ? req.user._id.toString() : req.user);
            console.log('[cardController.createCard] body keys:', Object.keys(req.body || {}));
        } catch (logErr) {
            console.warn('[cardController.createCard] failed to log request body', logErr);
        }

        const { type = "individual", user: userId, name, jobTitle, company, phone, email, website, address, profileImage, coverImage, socialLinks, isPublic, externalUrl } = req.body;

        if (!name) return errorResponse(res, "Name is required", 400);

        // if creating team card and userId provided, ensure valid id
        let userRef = null;
        if (userId) {
            if (!mongoose.Types.ObjectId.isValid(userId)) return errorResponse(res, "Invalid user id", 400);
            userRef = userId;
        }

        const card = await Card.create({
            createdBy: req.user._id,
            user: userRef,
            type,
            name,
            jobTitle,
            company,
            phone,
            email,
            website,
            address,
            profileImage,
            coverImage,
            socialLinks,
            isPublic: isPublic !== undefined ? isPublic : true,
            externalUrl
        });

        return successResponse(res, "Card created", card, 201);
    } catch (err) {
        next(err);
    }
};

// get cards related to the logged in user
exports.getMyCards = async (req, res, next) => {
    try {
        const cards = await Card.find({ $or: [{ createdBy: req.user._id }, { user: req.user._id }] });
        return successResponse(res, "Fetched cards", cards);
    } catch (err) {
        next(err);
    }
};

// public: get single card
exports.getCardById = async (req, res, next) => {
    try {
        const card = await Card.findById(req.params.id).populate("createdBy", "name email").populate("user", "name email");
        if (!card) return errorResponse(res, "Card not found", 404);
        return successResponse(res, "Card fetched", card);
    } catch (err) {
        next(err);
    }
};

// update card (creator or represented user)
exports.updateCard = async (req, res, next) => {
    try {
        // Debug: log update attempts
        try {
            console.log('[cardController.updateCard] update attempt for cardId:', req.params.id);
            console.log('[cardController.updateCard] auth user:', req.user && req.user._id ? req.user._id.toString() : req.user);
            console.log('[cardController.updateCard] body keys:', Object.keys(req.body || {}));
        } catch (logErr) {
            console.warn('[cardController.updateCard] failed to log update request', logErr);
        }

        const card = await Card.findById(req.params.id);
        if (!card) return errorResponse(res, "Card not found", 404);

        if (card.createdBy.toString() !== req.user._id.toString() && (!card.user || card.user.toString() !== req.user._id.toString())) {
            return errorResponse(res, "Not authorized to update", 403);
        }

        Object.assign(card, req.body);
        await card.save();

        return successResponse(res, "Card updated", card);
    } catch (err) {
        next(err);
    }
};

// delete card (only creator)
exports.deleteCard = async (req, res, next) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) return errorResponse(res, "Card not found", 404);

        if (card.createdBy.toString() !== req.user._id.toString()) return errorResponse(res, "Not authorized to delete", 403);

        await card.deleteOne();
        return successResponse(res, "Card deleted");
    } catch (err) {
        next(err);
    }
};
