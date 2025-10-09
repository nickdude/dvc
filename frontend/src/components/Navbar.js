// Navbar.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import BlueButton from "./buttons/BlueButton";
import BlueTransparentButton from "./buttons/BlueTransparentButton";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        // If not on homepage, navigate to homepage first
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        } else {
            // Already on homepage, just scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    return (
        <nav className="w-[100vw] h-24 bg-white flex items-center justify-center gap-14 px-4 shadow-sm">
            <div className="flex items-center gap-4">
                <img src={logo} className="h-7 w-54" alt="logo" onClick={() => navigate("/")} />
                <hr className="border-collapse h-7 w-[1px] bg-black" />
                <p className="font-normal font-inter text-xs text-grey">
                    Your digital business
                    <br /> card platform.
                </p>
            </div>

            <div className="flex items-center gap-8 font-inter">
                <p
                    className="font-medium text-sm text-lightGrey hover:text-blue-600 cursor-pointer transition-colors duration-200"
                    onClick={() => scrollToSection('why-digital')}
                >
                    Why digital card?
                </p>
                <p
                    className="font-medium text-sm text-lightGrey hover:text-blue-600 cursor-pointer transition-colors duration-200"
                    onClick={() => scrollToSection('process')}
                >
                    Process
                </p>
                <p
                    className="font-medium text-sm text-lightGrey hover:text-blue-600 cursor-pointer transition-colors duration-200"
                    onClick={() => scrollToSection('reviews')}
                >
                    Reviews
                </p>
                <p
                    className="font-medium text-sm text-lightGrey hover:text-blue-600 cursor-pointer transition-colors duration-200"
                    onClick={() => scrollToSection('paper-vs-digital')}
                >
                    Paper Vs Digital
                </p>
            </div>

            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <>
                        <Link to="/my-cards">
                            <p className="font-medium text-sm text-lightGrey hover:text-blue-600 transition">My Cards</p>
                        </Link>
                        <BlueTransparentButton label="Logout" onClick={handleLogout} />
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <BlueTransparentButton label="Login" />
                        </Link>
                        <Link to="/register">
                            <BlueButton label="Get Yours Now" />
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
