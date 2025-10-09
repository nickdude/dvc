import React from "react";
import profileOne from "../assets/profile-one.jpeg";

export default function ProfileCard() {
    return (
        <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center">
            {/* Full width image with gradient fade - representing style 1 */}
            <div className="relative w-full h-20 overflow-hidden">
                <img
                    src={profileOne}
                    alt="Profile"
                    className="w-full h-full object-cover object-top rounded-t-xl"
                    style={{ objectPosition: "top" }}
                />
                {/* Gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* Placeholder lines */}
            <div className="px-2 pb-2 -mt-2 relative z-10 flex flex-col items-center">
                <div className="h-2 bg-gray-300 rounded w-16 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-10"></div>
            </div>
        </div>
    );
}
