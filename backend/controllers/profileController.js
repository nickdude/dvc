const Profile = require("../models/Profile");
const { successResponse, errorResponse } = require("../middlewares/response");

// Create or update profile
exports.createOrUpdateProfile = async (req, res, next) => {
    try {
        const {
            slug,
            headline,
            bio,
            avatarUrl,
            coverUrl,
            phone,
            emailPublic,
            company,
            jobTitle,
            location,
            links,
            socials,
            isPublic
        } = req.body;

        if (!slug) {
            return errorResponse(res, "Slug is required", 400);
        }

        // Check if profile already exists for this user
        let profile = await Profile.findOne({ userId: req.user._id });

        if (profile) {
            // Update existing profile
            profile.slug = slug;
            profile.headline = headline || profile.headline;
            profile.bio = bio || profile.bio;
            profile.avatarUrl = avatarUrl || profile.avatarUrl;
            profile.coverUrl = coverUrl || profile.coverUrl;
            profile.phone = phone || profile.phone;
            profile.emailPublic = emailPublic || profile.emailPublic;
            profile.company = company || profile.company;
            profile.jobTitle = jobTitle || profile.jobTitle;
            profile.location = location || profile.location;
            profile.links = links || profile.links;
            profile.socials = socials || profile.socials;
            if (isPublic !== undefined) profile.isPublic = isPublic;

            await profile.save();
        } else {
            // Create new profile
            profile = await Profile.create({
                userId: req.user._id,
                slug,
                headline,
                bio,
                avatarUrl,
                coverUrl,
                phone,
                emailPublic,
                company,
                jobTitle,
                location,
                links: links || [],
                socials: socials || [],
                isPublic: isPublic !== undefined ? isPublic : true
            });
        }

        return successResponse(res, "Profile saved successfully", profile);
    } catch (error) {
        if (error.code === 11000) {
            return errorResponse(res, "Slug already exists. Please choose a different one.", 400);
        }
        next(error);
    }
};

// Get profile by slug (public)
exports.getProfileBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const profile = await Profile.findOne({ slug, isPublic: true }).populate('userId', 'name email');

        if (!profile) {
            return errorResponse(res, "Profile not found", 404);
        }

        return successResponse(res, "Profile fetched successfully", profile);
    } catch (error) {
        next(error);
    }
};

// Get user's own profile
exports.getMyProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ userId: req.user._id }).populate('userId', 'name email');

        if (!profile) {
            return errorResponse(res, "Profile not found", 404);
        }

        return successResponse(res, "Profile fetched successfully", profile);
    } catch (error) {
        next(error);
    }
};

// Delete profile
exports.deleteProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOneAndDelete({ userId: req.user._id });

        if (!profile) {
            return errorResponse(res, "Profile not found", 404);
        }

        return successResponse(res, "Profile deleted successfully");
    } catch (error) {
        next(error);
    }
};