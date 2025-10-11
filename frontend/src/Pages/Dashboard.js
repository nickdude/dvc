import Asidebar from "../components/Asidebar"
import edit from '../assets/edit.svg'
import swap from '../assets/swap.svg'
import share from '../assets/share.svg'
import WhiteButton from "../components/buttons/WhiteButton"
import dummyProfile from "../assets/dummy-profile.svg"
import { useState, useEffect } from "react"
import { AlignLeft, AlignCenter, AlignRight, Info } from "lucide-react";
import PreviewCardOne from "../components/PreviewCardOne"
import PreviewCardTwo from "../components/PreviewCardTwo"
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar"
import ProfileCard from "../components/ProfileCard"
import ProfileCardCircle from "../components/ProfileCardCircle"
import ProfileCardWithCover from "../components/ProfileCardWithCover"
import QRCodeGenerator from "../components/QRCodeGenerator"
import CardShare from "../components/CardShare"
import { saveCard, updateCard, getCardById } from "../services/cardService"
import { fileToBase64 } from "../utils/imageUtils"


const Dashboard = () => {

    const profileCardStyles = [
        { id: 1, name: "Profile Card", component: <ProfileCard /> },
        { id: 2, name: "Profile Card Circle", component: <ProfileCardCircle /> },
        { id: 3, name: "Profile Card with Cover", component: <ProfileCardWithCover /> },
    ]
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const cardIdFromUrl = searchParams.get('cardId');

    const [formData, setFormData] = useState({
        name: "Shubham Pandey",
        company: "ABC Corp",
        jobRole: "Software Engineer",
        industry: "Technology",
        bio: "Passionate about building web applications.",
        sections: [],
    });

    const [selectedFont, setSelectedFont] = useState("Inter");
    const [alignment, setAlignment] = useState("left");
    const [fullScreen, setFullScreen] = useState(false);
    const [selected, setSelected] = useState("gradient");
    const [autoDownload, setAutoDownload] = useState(false);
    const [floatingSave, setFloatingSave] = useState(true);
    const [enabled, setEnabled] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    // Initialize default colors based on template ID
    const getDefaultColors = (templateId) => {
        if (templateId === "1") {
            // Template 1 (PreviewCardOne) default colors
            return {
                cardBg: "#d9f1fe",
                buttonColor: "#058ef1",
                cardText: "#000000",
                buttonText: "#ffffff",
            };
        } else {
            // Template 2 (PreviewCardTwo) default colors
            return {
                cardBg: "#efcdcc",
                buttonColor: "#d97d7d",
                cardText: "#ffffff",
                buttonText: "#000000",
            };
        }
    };

    const [selectedColor, setSelectedColor] = useState(getDefaultColors(id));
    const [showQRCode, setShowQRCode] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [saving, setSaving] = useState(false);
    const [cardId, setCardId] = useState(null);
    const [cardName, setCardName] = useState("Shubham Pandey's Contact Card");

    // Reset colors to template defaults when template changes (only if not editing existing card)
    useEffect(() => {
        if (!cardIdFromUrl) {
            setSelectedColor(getDefaultColors(id));
        }
    }, [id, cardIdFromUrl]);

    // Load existing card data if editing
    useEffect(() => {
        const loadCardData = async () => {
            if (cardIdFromUrl) {
                try {
                    const response = await getCardById(cardIdFromUrl);
                    const card = response.data;

                    // Populate form with existing card data
                    setCardId(card._id);
                    setCardName(card.name);
                    setFormData({
                        name: card.name,
                        company: card.company || "",
                        jobRole: card.jobTitle || "",
                        industry: card.industry || "",
                        bio: card.bio || "",
                        phone: card.phone || "",
                        email: card.email || "",
                        address: card.address || "",
                        website: card.website || "",
                        sections: [],
                    });

                    // Set styling options
                    setSelectedFont(card.selectedFont || "Inter");
                    setAlignment(card.alignment || "left");
                    setSelected(card.selected || "solid");
                    setSelectedId(card.selectedProfileCardStyle || 1);
                    setFloatingSave(card.floatingSave !== false);
                    setFullScreen(card.fullScreen || false);
                    setAutoDownload(card.autoDownload || false);
                    setEnabled(card.enabled || false);

                    if (card.selectedColor) {
                        setSelectedColor(card.selectedColor);
                    }

                    // Set images
                    if (card.profileImage) setProfileImage(card.profileImage);
                    if (card.coverImage) setCoverImage(card.coverImage);

                } catch (error) {
                    console.error('Error loading card data:', error);
                }
            }
        };

        loadCardData();
    }, [cardIdFromUrl]);

    const [selectedId, setSelectedId] = useState(profileCardStyles[0].id);

    const handleImageUpload = async (e, type) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Show loading state
                if (type === "profile") {
                    setProfileImage("loading");
                } else if (type === "cover") {
                    setCoverImage("loading");
                }

                // Compress and convert to base64
                const compressedImage = await fileToBase64(file);

                if (type === "profile") {
                    setProfileImage(compressedImage);
                } else if (type === "cover") {
                    setCoverImage(compressedImage);
                }
            } catch (error) {
                console.error('Error processing image:', error);
                alert('Error processing image. Please try a smaller file.');

                // Reset loading state
                if (type === "profile") {
                    setProfileImage(null);
                } else if (type === "cover") {
                    setCoverImage(null);
                }
            }
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddSection = () => {
        setFormData((prev) => ({
            ...prev,
            sections: [...prev.sections, `Section ${prev.sections.length + 1}`],
        }));
    };

    const handleSaveCard = async () => {
        setSaving(true);
        try {
            console.log('Saving card with selectedColor:', selectedColor); // Debug log
            const cardData = {
                name: cardName,
                jobTitle: formData.jobRole,
                company: formData.company,
                industry: formData.industry,
                bio: formData.bio,
                phone: formData.phone,
                email: formData.email,
                website: formData.website,
                address: formData.address,
                profileImage: profileImage,
                coverImage: coverImage,
                socialLinks: {
                    linkedin: formData.linkedin || '',
                    twitter: formData.twitter || '',
                    instagram: formData.instagram || '',
                    facebook: formData.facebook || ''
                },
                // Save styling preferences
                selectedFont: selectedFont,
                alignment: alignment,
                selectedProfileCardStyle: selectedId,
                selected: selected,
                selectedColor: selectedColor,
                floatingSave: floatingSave,
                fullScreen: fullScreen,
                autoDownload: autoDownload,
                enabled: enabled,
                // Save which dashboard template was used to create this card
                templateId: id, // This comes from useParams() - the dashboard route (/dashboard/1 or /dashboard/2)
                isPublic: true,
                type: "individual"
            };

            let response;
            if (cardId) {
                response = await updateCard(cardId, cardData);
            } else {
                response = await saveCard(cardData);
                setCardId(response.data._id);
            }

            alert('Card saved successfully!');
        } catch (error) {
            console.error('Error saving card:', error);
            alert('Failed to save card. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const getCurrentCardData = () => {
        return {
            id: cardId,
            name: cardName,
            jobRole: formData.jobRole,
            company: formData.company,
            phone: formData.phone,
            email: formData.email,
            profileImage: profileImage,
            coverImage: coverImage
        };
    };

    const options = [
        { id: "left", icon: <AlignLeft size={20} /> },
        { id: "center", icon: <AlignCenter size={20} /> },
        { id: "right", icon: <AlignRight size={20} /> },
    ];

    const fonts = [
        { name: "Inter", className: "font-[inter]" },
        { name: "Roboto", className: "font-[roboto]" },
        { name: "Montserrat", className: "font-[montserrat]" },
        { name: "Merriweather", className: "font-[merriweather]" },
        { name: "Caveat", className: "font-[caveat]" },
        { name: "Gloria Hallelujah", className: "font-[gloriaHallelujah]" },
    ];

    const screenOptions = [
        {
            id: "solid",
            label: "Solid Color",
            preview: "bg-gray-700",
        },
        {
            id: "gradient",
            label: "Gradient",
            preview: "bg-gradient-to-b from-gray-400 to-gray-700",
        },
    ];



    const colorOptions = [
        "#000000", "#ef4444", "#ec4899", "#f97316", "#facc15",
        "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6"
    ];

    const sections = [
        { key: "cardBg", label: "Card Background" },
        { key: "buttonColor", label: "Button Color" },
        { key: "cardText", label: "Card Text" },
        { key: "buttonText", label: "Button Text" },
    ];

    return (
        <>
            <div className='w-full min-h-screen flex flex-col lg:flex-row bg-gray-50'>
                <Asidebar />
                <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-4">
                    {/* Mobile Preview Card */}
                    {id === "1" ? <PreviewCardOne
                        profileImage={profileImage || dummyProfile}
                        coverImage={coverImage}
                        name={formData.name}
                        jobRole={formData.jobRole}
                        company={formData.company}
                        industry={formData.industry}
                        bio={formData.bio}
                        phone={formData.phone}
                        email={formData.email}
                        address={formData.address}
                        selectedFont={selectedFont}
                        alignment={alignment}
                        fullScreen={fullScreen}
                        autoDownload={autoDownload}
                        floatingSave={floatingSave}
                        enabled={enabled}
                        sections={formData.sections}
                        showButtons={true}
                        selected={selected}
                        selectedColor={selectedColor}
                        selectedProfileCardStyle={selectedId}
                    /> : <PreviewCardTwo
                        profileImage={profileImage || dummyProfile}
                        coverImage={coverImage}
                        name={formData.name}
                        jobRole={formData.jobRole}
                        company={formData.company}
                        industry={formData.industry}
                        bio={formData.bio}
                        phone={formData.phone}
                        email={formData.email}
                        address={formData.address}
                        selectedFont={selectedFont}
                        alignment={alignment}
                        fullScreen={fullScreen}
                        autoDownload={autoDownload}
                        floatingSave={floatingSave}
                        enabled={enabled}
                        sections={formData.sections}
                        showButtons={true}
                        selected={selected}
                        selectedColor={selectedColor}
                        selectedProfileCardStyle={selectedId}
                    />}

                </div>

                <div className="w-full lg:w-1/2 h-screen flex flex-col justify-start text-3xl rounded-lg font-inter text-semiLightBlack overflow-y-auto shadow-lg mt-4 lg:mt-10 px-4 lg:px-0">
                    <div className="m-4 h-fit flex flex-wrap gap-2 sm:gap-4">
                        <WhiteButton
                            icon={edit}
                            text={saving ? "Saving..." : "Save"}
                            onClick={handleSaveCard}
                            disabled={saving}
                        />
                        <WhiteButton
                            icon={swap}
                            text="QR Code"
                            onClick={() => setShowQRCode(true)}
                        />
                        <WhiteButton
                            icon={share}
                            text="Share"
                            onClick={() => setShowShare(true)}
                        />
                    </div>
                    <div className="m-2 sm:m-4 h-fit flex flex-col space-y-3">
                        <h1 className="text-lg sm:text-xl text-black font-semibold">Create Your Digital NFC Card</h1>
                        <p className="text-xs text-semiDarkBlack font-normal">
                            This digital business card shares your main contact information only.
                        </p>
                        <p className="text-sm text-semiBlack font-semibold">Card Name</p>
                        <input
                            type="text"
                            placeholder="Shubham Pandey's Contact Card"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full max-w-lg text-sm text-darkBlack rounded-lg p-3 border border-gray-300 outline-none"
                        />

                        <p className="text-sm text-semiBlack font-semibold">Card Layout</p>

                        <div className="w-fit h-fit flex items-center justify-start gap-4 sm:gap-8 lg:gap-12 flex-wrap">{profileCardStyles.length > 0 && profileCardStyles.map((card) => (
                            <div
                                key={card.id}
                                onClick={() => setSelectedId(card.id)}
                                className="flex flex-col items-center justify-center space-y-2 cursor-pointer"
                            >
                                <div
                                    className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-offWhite rounded-lg flex items-center justify-center transition duration-300 ${selectedId === card.id
                                        ? "border-[1px] border-gray-300 shadow-lg rounded-xl bg-blue-50"
                                        : ""
                                        }`}
                                >
                                    {card.component}
                                </div>
                                <p
                                    className={`text-xs font-medium transition ${selectedId === card.id ? "text-blue-600 font-semibold" : "text-gray-400"
                                        }`}
                                >
                                    {card.name}
                                </p>
                            </div>
                        ))}
                        </div>

                        <div className="w-full flex h-fit mt-6">
                            <div className="w-36">
                                <p className="text-sm text-semiBlack font-semibold mb-4">Profile Photo</p>
                                {profileImage === "loading" ? (
                                    <div className="w-24 h-24 mt-2 rounded-lg bg-gray-200 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                    </div>
                                ) : (
                                    <img
                                        src={profileImage || dummyProfile}
                                        alt="profile"
                                        className="w-24 h-24 mt-2 rounded-lg object-cover"
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "profile")}
                                    className="mt-2 text-xs"
                                    disabled={profileImage === "loading"}
                                />
                            </div>

                            <div className="flex-grow">
                                <p className="text-sm text-semiBlack font-semibold mb-4">Cover Background</p>
                                {coverImage === "loading" ? (
                                    <div className="w-full max-w-md p-6 border-2 border-dashed rounded-lg text-center transition border-gray-300 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                    </div>
                                ) : (
                                    <div className="w-full max-w-md p-6 border-2 border-dashed rounded-lg text-center transition border-gray-300">
                                        {coverImage && (
                                            <img
                                                src={coverImage}
                                                alt="Cover preview"
                                                className="w-full h-32 object-cover rounded-md mb-3"
                                            />
                                        )}
                                        <input
                                            type="file"
                                            id="cover-upload"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, "cover")}
                                            className="hidden"
                                        />
                                        <p className="text-gray-500 text-sm">
                                            {coverImage ? "Change cover image" : "Drag file here for upload or"}
                                        </p>
                                        <label
                                            htmlFor="cover-upload"
                                            className="mt-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md cursor-pointer text-sm shadow"
                                        >
                                            {coverImage ? "Change Files" : "Select Files"}
                                        </label>
                                    </div>
                                )}
                            </div>

                        </div>


                    </div>

                    <div className="m-4 h-fit">
                        <div className="max-w-2xl mx-auto p-6">
                            {/* Name & Company */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Shubham Pandey"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Company Name"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Job Title & Industry */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title or Role</label>
                                    <input
                                        type="text"
                                        name="jobRole"
                                        placeholder="Job role"
                                        value={formData.jobRole}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                    <input
                                        type="text"
                                        name="industry"
                                        placeholder="Industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    rows="4"
                                    name="bio"
                                    placeholder="Write something..."
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Add Sections */}
                            <div>
                                <h2 className="text-sm font-semibold text-gray-800 mb-2">Add Sections to Your Card</h2>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <p className="text-sm font-semibold text-gray-700 mb-1">
                                        Customize Your Card With Sections
                                    </p>
                                    <p className="text-xs text-gray-500 mb-3">
                                        Click "+ Add Section" to add contact details, social media, and more.
                                    </p>
                                    <button
                                        onClick={handleAddSection}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm shadow">
                                        Add Section
                                    </button>

                                    {/* Preview Added Sections */}
                                    <div className="mt-4 space-y-2">
                                        {formData.sections.map((section, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-50 border rounded p-2 text-sm text-gray-700"
                                            >
                                                {section}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-lg mx-auto p-6">
                        <h2 className="text-sm font-semibold text-gray-800 mb-3">
                            Choose a Font
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {fonts.map((font) => (
                                <button
                                    key={font.name}
                                    onClick={() => setSelectedFont(font.name)}
                                    className={`w-full border text-sm rounded-lg py-3 px-4 text-center text-gray-600 transition 
                               ${selectedFont === font.name
                                            ? "border-blue-500 bg-blue-50 text-blue-600"
                                            : "border-gray-300 hover:border-gray-400"
                                        } ${font.className}`}
                                >
                                    {font.name}
                                </button>
                            ))}
                        </div>

                        {/* <p className="mt-4 text-sm text-gray-500">
                        Selected Font: <span className="font-semibold">{selectedFont}</span>
                    </p> */}
                    </div>

                    <div className="max-w-lg mx-auto p-6">
                        {/* Label with info icon */}
                        <div className="flex gap-2 mb-3">
                            <h2 className="text-sm font-semibold text-gray-800">
                                Card Layout Alignment
                            </h2>
                            <Info size={14} className="text-gray-400" />
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                            {options.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setAlignment(opt.id)}
                                    className={`w-full border rounded-lg py-3 flex items-center justify-center transition 
              ${alignment === opt.id
                                            ? "border-blue-500 bg-blue-50 text-blue-600"
                                            : "border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    {opt.icon}
                                </button>
                            ))}
                        </div>

                        {/* Preview */}
                        {/* <p className="mt-4 text-sm text-gray-500">
                        Selected alignment:{" "}
                        <span className="font-semibold">{alignment}</span>
                    </p> */}
                    </div>

                    <div className="max-w-lg mx-auto p-6">
                        {/* Title + description */}
                        <h2 className="text-sm font-semibold text-gray-800 mb-1">
                            Choose Your Background Style
                        </h2>
                        <p className="text-xs text-gray-500 mb-3">
                            Personalize your card’s background with a solid color, gradient, image, or even video.
                        </p>

                        {/* Toggle */}
                        <div className="flex items-center gap-2 mb-5">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={fullScreen}
                                    onChange={() => setFullScreen(!fullScreen)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition"></div>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                            </label>
                            <span className="text-sm font-medium text-gray-700">Full-Screen Background</span>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {screenOptions.map((opt) => (
                                <div key={opt.id} className="flex flex-col items-center">
                                    <button
                                        key={opt.id}
                                        onClick={() => setSelected(opt.id)}
                                        className={`rounded-xl ${fullScreen ? "" : "p-2"} flex flex-col items-center border transition ${selected === opt.id
                                            ? "border-black shadow-md"
                                            : "border-gray-300 hover:border-gray-400"
                                            }`}
                                    >
                                        <div
                                            className={`w-32 h-44 sm:w-36 sm:h-52 rounded-lg ${opt.preview}`}
                                        ></div>

                                    </button>
                                    <span className="mt-2 text-sm text-gray-700">{opt.label}</span>
                                </div>

                            ))}
                        </div>

                        {/* Preview */}
                        {/* <p className="mt-4 text-sm text-gray-500">
                        Selected: <span className="font-semibold">{selected}</span> | Full-Screen:{" "}
                        <span className="font-semibold">{fullScreen ? "Yes" : "No"}</span>
                    </p> */}
                    </div>

                    <div className="max-w-lg mx-auto p-6 space-y-6">
                        {sections.map((section) => (
                            <div key={section.key}>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-sm font-semibold text-gray-800">
                                        {section.label}
                                    </h3>
                                    <span className="text-gray-400 text-xs cursor-pointer">ⓘ</span>
                                </div>

                                {/* Colors */}
                                <div className="flex flex-wrap gap-3">
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() =>
                                                setSelectedColor((prev) => ({ ...prev, [section.key]: color }))
                                            }
                                            className={`w-6 h-6 rounded-full transition ${selectedColor[section.key] === color
                                                ? "border-black scale-110"
                                                : "border-gray-300"
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}

                                    {/* Custom Color Picker */}
                                    <label
                                        className={`w-6 h-6 rounded-full cursor-pointer flex items-center justify-center text-xs ${!colorOptions.includes(selectedColor[section.key])
                                            ? "border-black"
                                            : "border-gray-300"
                                            }`}
                                    >
                                        🎨
                                        <input
                                            type="color"
                                            value={selectedColor[section.key]}
                                            onChange={(e) =>
                                                setSelectedColor((prev) => ({
                                                    ...prev,
                                                    [section.key]: e.target.value,
                                                }))
                                            }
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}

                        {/* Preview */}
                        {/* <div className="mt-6 p-4 rounded-lg shadow-md text-center"
                        style={{ backgroundColor: selectedColor.cardBg, color: selectedColor.cardText }}
                    >
                        <p className="mb-4">Card Preview</p>
                        <button
                            className="px-4 py-2 rounded-lg font-medium"
                            style={{
                                backgroundColor: selectedColor.buttonColor,
                                color: selectedColor.buttonText,
                            }}
                        >
                            Button
                        </button>
                    </div> */}
                    </div>

                    <div className="space-y-4 p-4 bg-white rounded-xl shadow-sm">
                        {/* Automatic Download */}
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h2 className="text-base font-semibold text-black">Automatic Download</h2>
                                <p className="text-sm text-gray-500">
                                    Turn this on to let your card download instantly without showing a preview.
                                </p>
                            </div>
                            <button
                                onClick={() => setAutoDownload(!autoDownload)}
                                className={`relative w-11 h-6 flex items-center rounded-full transition ${autoDownload ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${autoDownload ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Floating Save Button */}
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h2 className="text-base font-semibold text-black">Floating Save Button</h2>
                                <p className="text-sm text-gray-500">
                                    Add a floating button to your card so visitors can save your details.
                                </p>
                            </div>
                            <button
                                onClick={() => setFloatingSave(!floatingSave)}
                                className={`relative w-11 h-6 flex items-center rounded-full transition ${floatingSave ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${floatingSave ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="max-w-lg p-6 ">
                        {/* Header */}
                        <h2 className="text-lg font-semibold text-black">Lead Capture</h2>
                        <p className="text-sm text-gray-500">
                            Collect contact details and automate follow-ups.
                        </p>

                        {/* Preview Card */}
                        <div className="mt-4 w-60 border rounded-xl bg-white shadow-sm flex flex-col items-center p-4">
                            <div className="w-full h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                                {/* Placeholder preview image */}
                                <span className="text-xs text-gray-400">[ Preview Image ]</span>
                            </div>

                            <h3 className="mt-3 text-base font-semibold text-black">Lead Form</h3>
                            <p className="text-sm text-gray-500 text-center">
                                Show a form when someone opens your card to collect their contact details.
                            </p>

                            {/* Toggle */}
                            <button
                                onClick={() => setEnabled(!enabled)}
                                className={`mt-4 relative w-12 h-6 flex items-center rounded-full transition ${enabled ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${enabled ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>

                            <span className="mt-1 text-sm font-medium text-gray-600">
                                {enabled ? "On" : "Off"}
                            </span>
                        </div>
                    </div>
                </div>
            </div >

            {/* QR Code Modal */}
            <QRCodeGenerator
                cardData={getCurrentCardData()}
                isOpen={showQRCode}
                onClose={() => setShowQRCode(false)}
            />

            {/* Share Modal */}
            <CardShare
                cardData={getCurrentCardData()}
                isOpen={showShare}
                onClose={() => setShowShare(false)}
            />

        </>
    )
}

export default Dashboard