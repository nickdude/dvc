const { successResponse, errorResponse } = require("../middlewares/response");

// For simplicity, using in-memory storage for card templates
// In production, you'd use a database
let cardTemplates = [
    {
        _id: "1",
        name: "Modern Professional",
        description: "Clean and professional design for business professionals",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: "2",
        name: "Creative Designer",
        description: "Vibrant and creative design for designers and artists",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

// Get all card templates
exports.getAllTemplates = async (req, res, next) => {
    try {
        return successResponse(res, "Card templates fetched successfully", cardTemplates);
    } catch (error) {
        next(error);
    }
};

// Create new card template
exports.createTemplate = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return errorResponse(res, "Name and description are required", 400);
        }

        const newTemplate = {
            _id: (cardTemplates.length + 1).toString(),
            name,
            description,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        cardTemplates.push(newTemplate);

        return successResponse(res, "Card template created successfully", newTemplate, 201);
    } catch (error) {
        next(error);
    }
};

// Delete card template
exports.deleteTemplate = async (req, res, next) => {
    try {
        const { id } = req.params;

        const templateIndex = cardTemplates.findIndex(template => template._id === id);

        if (templateIndex === -1) {
            return errorResponse(res, "Card template not found", 404);
        }

        cardTemplates.splice(templateIndex, 1);

        return successResponse(res, "Card template deleted successfully");
    } catch (error) {
        next(error);
    }
};

// Update card template
exports.updateTemplate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, isActive } = req.body;

        const templateIndex = cardTemplates.findIndex(template => template._id === id);

        if (templateIndex === -1) {
            return errorResponse(res, "Card template not found", 404);
        }

        if (name) cardTemplates[templateIndex].name = name;
        if (description) cardTemplates[templateIndex].description = description;
        if (isActive !== undefined) cardTemplates[templateIndex].isActive = isActive;
        cardTemplates[templateIndex].updatedAt = new Date();

        return successResponse(res, "Card template updated successfully", cardTemplates[templateIndex]);
    } catch (error) {
        next(error);
    }
};