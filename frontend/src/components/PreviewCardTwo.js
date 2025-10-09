import profileOne from '../assets/profile-one.jpeg';
import dummyProfile from '../assets/profile-one.jpeg';
import dummyCover from '../assets/cover-one.png';

import {
    Mail,
    Linkedin,
    Facebook,
    Phone,
    MapPin,
    Globe,
} from "lucide-react"; // using lucide-react icons

const PreviewCardTwo = ({
    profileImage = dummyProfile,
    coverImage = dummyCover,
    name = "Aisha Patel",
    jobRole = "Software Engineer",
    company = "Tech Solutions",
    industry = "Information Technology",
    bio = "Passionate about building user-friendly applications.",
    phone = "+1 (555) 123-4567",
    email = "aisha.patel@example.com",
    address = "123 Main St, Anytown, USA",
    buttonText = "Add To Contacts",
    selectedFont = "sans-serif",
    alignment = "left",
    fullScreen = true,
    autoDownload = false,
    enabled = false,
    floatingSave = true,
    selected = 'gradient',
    selectedColor = {
        cardBg: "#efcdcc",
        buttonColor: "#d97d7d",
        cardText: "#ffffff",
        buttonText: "#000000",
    },
    selectedProfileCardStyle = 1
}
) => {

    // Function to render profile image based on selected style
    const renderProfileImage = () => {
        switch (selectedProfileCardStyle) {
            case 1: // Profile Card - full width image with gradient fade
                return (
                    <div
                        className="w-full h-32 flex items-center justify-center relative mb-3"
                        style={{
                            backgroundColor: (!coverImage && !profileImage) ? selectedColor?.cardBg : "transparent",
                        }}
                    >
                        {/* If cover image exists, use it as background, otherwise use profile image as full width */}
                        <img
                            src={coverImage || profileImage}
                            alt={coverImage ? "cover" : "profile"}
                            className="w-full h-full object-cover rounded-t-xl"
                        />
                        {/* Gradient overlay for better text visibility */}
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent rounded-t-xl"></div>
                    </div>
                );

            case 2: // Profile Card Circle - circular profile image, no cover
                return (
                    <div className="w-full h-32 flex items-center justify-center mb-3">
                        <img
                            src={profileImage}
                            alt="profile"
                            className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                        />
                    </div>
                );

            case 3: // Profile Card with Cover - cover background with circular profile overlay
                return (
                    <div
                        className="w-full h-32 flex items-center justify-center relative mb-3"
                        style={{
                            backgroundColor: coverImage ? "transparent" : selectedColor?.cardBg,
                        }}
                    >
                        {coverImage && (
                            <img src={coverImage} alt="cover" className="w-full h-full object-cover rounded-t-xl" />
                        )}
                        <img
                            src={profileImage}
                            alt="profile"
                            className="w-20 h-20 rounded-full border-4 border-white shadow-md absolute"
                        />
                    </div>
                );

            default:
                return (
                    <div
                        className="w-full h-32 flex items-center justify-center relative mb-3"
                        style={{
                            backgroundColor: !coverImage ? selectedColor?.cardBg : "transparent",
                        }}
                    >
                        {coverImage && (
                            <img src={coverImage} alt="cover" className="w-full h-full object-cover rounded-t-xl" />
                        )}
                        <img
                            src={profileImage}
                            alt="profile"
                            className="w-20 h-20 rounded-full border-4 border-white shadow-md absolute"
                        />
                    </div>
                );
        }
    };


    return (
        <div className={`w-80 h-[560px]  rounded-3xl shadow-lg overflow-hidden mx-auto  ${fullScreen ? "" : "border-[10px]"}`}
            style={{
                fontFamily: selectedFont || "sans-serif",
                textAlign: alignment || "center",
                color: selectedColor?.cardText || "#000",
                background: selected === "gradient"
                    ? `linear-gradient(to bottom, #ffffff, ${selectedColor?.cardBg || "#efcdcc"})` // gray gradient with fallback
                    : selectedColor?.cardBg || "#efcdcc", // fallback to template 2 default
            }}>
            {/* Profile Image Section - Dynamic based on selected style */}
            {renderProfileImage()}

            {/* Info Section */}
            < div className="p-5" >
                <h2 className="text-lg font-bold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-600">
                    {jobRole} at {company}
                </p>

                {/* Location */}
                <div className="flex text-gray-700 mt-1 text-sm">
                    <span>{address}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mt-3">
                    {bio}
                </p>



                {/* Contact Icons */}
                {
                    floatingSave && <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="flex flex-col items-center">
                            <div className=" p-3 rounded-lg text-white"
                                style={{
                                    backgroundColor: selectedColor?.buttonColor || "#2563eb",
                                    color: selectedColor?.buttonText || "#fff",
                                }}
                            >
                                <Mail className="w-6 h-6" />
                            </div>
                            <p className="text-xs mt-1 text-gray-700">Email</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-lg text-white"
                                style={{
                                    backgroundColor: selectedColor?.buttonColor || "#2563eb",
                                    color: selectedColor?.buttonText || "#fff",
                                }}
                            >
                                <Linkedin className="w-6 h-6" />
                            </div>
                            <p className="text-xs mt-1 text-gray-700">LinkedIn</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-lg text-white"
                                style={{
                                    backgroundColor: selectedColor?.buttonColor || "#2563eb",
                                    color: selectedColor?.buttonText || "#fff",
                                }}
                            >
                                <Facebook className="w-6 h-6" />
                            </div>
                            <p className="text-xs mt-1 text-gray-700">Facebook</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-lg text-white"
                                style={{
                                    backgroundColor: selectedColor?.buttonColor || "#2563eb",
                                    color: selectedColor?.buttonText || "#fff",
                                }}
                            >
                                <Phone className="w-6 h-6" />
                            </div>
                            <p className="text-xs mt-1 text-gray-700">Phone</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-lg text-white"
                                style={{
                                    backgroundColor: selectedColor?.buttonColor || "#2563eb",
                                    color: selectedColor?.buttonText || "#fff",
                                }}
                            >
                                <MapPin className="w-6 h-6" />
                            </div>
                            <p className="text-xs mt-1 text-gray-700">Address</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-lg text-white"
                                style={{
                                    backgroundColor: selectedColor?.buttonColor || "#2563eb",
                                    color: selectedColor?.buttonText || "#fff",
                                }}
                            >
                                <Globe className="w-6 h-6" />
                            </div>
                            <p className="text-xs mt-1 text-gray-700">Website</p>
                        </div>
                    </div>
                }

                {/* Save Contact Button */}
                <button className="w-full text-white text-center py-3 mt-4 rounded-lg font-medium"
                    style={{
                        backgroundColor: selectedColor?.buttonColor || "#2563eb",
                        color: selectedColor?.buttonText || "#fff",
                    }}>
                    Save Contact
                </button>
            </div >
        </div >
    );
};

export default PreviewCardTwo;
