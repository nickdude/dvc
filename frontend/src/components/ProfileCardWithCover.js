import React from "react";
import profileOne from "../assets/profile-one.jpeg";

export default function ProfileCardWithCover() {
    return (
        <div className="w-full h-full bg-white rounded-xl shadow-md flex flex-col items-center justify-end relative overflow-hidden">
            {/* Cover background - representing style 3 */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-xl"></div>

            {/* Circular Profile Image overlaid on cover */}
            <div className="absolute top-8 w-fit h-fit rounded-full overflow-hidden border-2 border-white">
                <img
                    src={profileOne}
                    alt="Profile"
                    className="w-10 h-10 object-cover object-top rounded-full"
                    style={{ objectPosition: "top" }}
                />
            </div>

            {/* Placeholder lines */}
            <div className="px-2 pb-2 flex flex-col items-center mt-8">
                <div className="h-2 bg-gray-300 rounded w-16 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-10"></div>
            </div>
        </div>
    );
}
