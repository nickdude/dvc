import React from "react";
import { fetchImageAsBase64, makeVCard, saveVCard } from '../utils/vcard';
import { useToast } from '../contexts/ToastContext';
import dummyProfile from '../assets/profile-one.jpeg';
import dummyCover from '../assets/cover-one.png';

const PreviewCardOne = ({
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
    website = '',
    buttonText = "Add To Contacts",
    selectedFont = "sans-serif",
    alignment = "left",
    fullScreen = true,
    autoDownload = false,
    enabled = false,
    floatingSave = true,
    selected = 'gradient',
    selectedColor = {
        cardBg: "#d9f1fe",
        buttonColor: "#058ef1",
        cardText: "#000000",
        buttonText: "#ffffff",
    },
    selectedProfileCardStyle = 1
}) => {

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

    const { addToast, removeToast } = useToast();

    const handleSave = async () => {
        const preparingId = addToast('Preparing contact...', { type: 'info', duration: 0 });
        try {
            let photo = null;
            if (profileImage) {
                const fetched = await fetchImageAsBase64(profileImage).catch(() => null);
                if (fetched) photo = fetched;
            }

            const v = makeVCard({
                name,
                phone,
                email,
                address,
                company,
                jobTitle: jobRole,
                website,
                note: bio,
                photoBase64: photo?.base64,
                photoMime: photo?.mime,
            });

            await saveVCard(v, `${(name || 'contact').replace(/\s+/g, '_')}.vcf`);
            removeToast(preparingId);
            addToast('Contact prepared — check your share/download', { type: 'success' });
        } catch (err) {
            console.error('Failed to save contact', err);
            removeToast(preparingId);
            addToast('Failed to prepare contact', { type: 'error' });
        }
    };

    return (
        <div
            className={`${fullScreen ? 'w-full h-full rounded-3xl p-3 box-border' : 'w-[320px] h-[560px] rounded-3xl p-3'} shadow-lg flex flex-col items-center overflow-hidden overflow-y-auto no-scrollbar ${fullScreen ? '' : 'border-[10px]'} `}
            style={{
                background: selected === "gradient"
                    ? `linear-gradient(to bottom, #ffffff, ${selectedColor?.cardBg || "#d9f1fe"})` // gray gradient with fallback
                    : selectedColor?.cardBg || "#d9f1fe", // fallback to template 1 default
                fontFamily: selectedFont || "sans-serif",
                textAlign: alignment || "center",
                color: selectedColor?.cardText || "#000",
            }}
        >
            {/* Profile Image Section - Dynamic based on selected style */}
            {renderProfileImage()}

            {/* Card Content */}
            <div className={`flex flex-col justify-center flex-1 ${fullScreen ? 'p-4' : 'p-4'}`}>
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-sm">{company}</p>
                <p className="text-xs mt-2">
                    {jobRole} | {industry}
                </p>
                {bio && <p className="text-xs mt-3 leading-snug">{bio}</p>}
            </div>

            {/* Buttons (Call, Message, Mail) */}
            {floatingSave && (
                <div className="flex justify-between mt-2 w-full px-4">
                    <button className="flex flex-col items-center bg-blue-500 text-white px-4 py-2 rounded-lg w-1/3">
                        <img
                            src="https://img.icons8.com/ios-filled/24/ffffff/phone.png"
                            alt="call icon"
                        />
                        <span className="text-sm">Call</span>
                    </button>
                    <button className="flex flex-col items-center bg-blue-500 text-white px-4 py-2 rounded-lg w-1/3 mx-2">
                        <img
                            src="https://img.icons8.com/ios-filled/24/ffffff/chat.png"
                            alt="chat icon"
                        />
                        <span className="text-sm">Message</span>
                    </button>
                    <button className="flex flex-col items-center bg-blue-500 text-white px-4 py-2 rounded-lg w-1/3">
                        <img
                            src="https://img.icons8.com/ios-filled/24/ffffff/mail.png"
                            alt="mail icon"
                        />
                        <span className="text-sm">Mail</span>
                    </button>
                </div>
            )}

            {/* Details */}
            <div className="mt-5 space-y-3 text-sm w-full">
                {phone && (
                    <div className="flex justify-between items-center bg-white rounded-lg p-3 shadow">
                        <div>
                            <p className="text-xs text-blue-500">Home</p>
                            <p className="font-medium text-gray-700">{phone}</p>
                        </div>
                        <img
                            src="https://img.icons8.com/ios-filled/24/4a90e2/phone.png"
                            alt="phone icon"
                        />
                    </div>
                )}

                {email && (
                    <div className="flex justify-between items-center bg-white rounded-lg p-3 shadow">
                        <div>
                            <p className="text-xs text-blue-500">Work</p>
                            <p className="font-medium text-gray-700">{email}</p>
                        </div>
                        <img
                            src="https://img.icons8.com/ios-filled/24/d0021b/email.png"
                            alt="email icon"
                        />
                    </div>
                )}

                {address && (
                    <div className="flex justify-between items-center bg-white rounded-lg p-3 shadow">
                        <div>
                            <p className="text-xs text-blue-500">Work</p>
                            <p className="font-medium text-gray-700">{address}</p>
                        </div>
                        <img
                            src="https://img.icons8.com/ios-filled/24/7ed321/address--v1.png"
                            alt="address icon"
                        />
                    </div>
                )}

                {industry && (
                    <div className="bg-white rounded-lg p-3 shadow">
                        <p className="text-xs text-blue-500">Industry</p>
                        <p className="font-medium text-gray-700">{industry}</p>
                    </div>
                )}
            </div>

            {/* Action Button */}
            <div className="w-full flex justify-center p-4">
                <button
                    className="px-6 py-2 rounded-lg font-medium shadow w-full"
                    style={{
                        backgroundColor: selectedColor?.buttonColor || "#2563eb",
                        color: selectedColor?.buttonText || "#fff",
                    }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default PreviewCardOne;
