const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who created this card
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // the user the card represents (optional)
    type: { type: String, enum: ["individual", "team"], default: "individual" },
    name: { type: String, required: true },
    jobTitle: String,
    company: String,
    industry: String,
    bio: String,
    phone: String,
    email: String,
    website: String,
    address: String,
    profileImage: String,
    coverImage: String,
    socialLinks: {
        linkedin: String,
        twitter: String,
        instagram: String,
        facebook: String
    },
    // Card styling and configuration
    selectedFont: { type: String, default: "Inter" },
    alignment: { type: String, default: "left" },
    selectedProfileCardStyle: { type: Number, default: 1 },
    selected: { type: String, default: "gradient" },
    selectedColor: {
        type: {
            cardBg: { type: String, default: "#d9f1fe" },
            buttonColor: { type: String, default: "#058ef1" },
            cardText: { type: String, default: "#000000" },
            buttonText: { type: String, default: "#ffffff" }
        },
        default: {
            cardBg: "#d9f1fe",
            buttonColor: "#058ef1",
            cardText: "#000000",
            buttonText: "#ffffff"
        }
    },
    floatingSave: { type: Boolean, default: true },
    fullScreen: { type: Boolean, default: false },
    autoDownload: { type: Boolean, default: false },
    enabled: { type: Boolean, default: false },
    templateId: { type: String }, // which dashboard template was used (1 or 2)
    isPublic: { type: Boolean, default: true },
    slug: { type: String }, // optional friendly link
    externalUrl: { type: String }, // external public URL (e.g., instaviz link)
}, { timestamps: true });

module.exports = mongoose.model("Card", cardSchema);
