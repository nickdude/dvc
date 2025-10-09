const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        slug: { type: String, unique: true, required: true },
        headline: String,
        bio: String,
        avatarUrl: String,
        coverUrl: String,
        phone: String,
        emailPublic: String,
        company: String,
        jobTitle: String,
        location: String,
        links: [{ label: String, url: String, sort: { type: Number, default: 0 } }],
        socials: [{ network: String, handle: String, url: String }],
        isPublic: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
