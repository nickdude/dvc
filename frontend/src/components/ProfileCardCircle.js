import React from "react";
import profileOne from "../assets/profile-one.jpeg";

export default function ProfileCardCircle() {
    return (
        <div className="w-full h-full bg-white rounded-xl shadow-md flex flex-col items-center justify-center">
            {/* Circular Profile Image - representing style 2 */}
            <div className="w-fit h-fit rounded-full overflow-hidden mb-3">
                <img
                    src={profileOne}
                    alt="Profile"
                    className="w-12 h-12 object-cover object-top rounded-full"
                    style={{ objectPosition: "top" }}
                />
            </div>

            {/* Placeholder lines */}
            <div className="px-2 pb-2 flex flex-col items-center">
                <div className="h-2 bg-gray-300 rounded w-16 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-10"></div>
            </div>
        </div>
    );
}
