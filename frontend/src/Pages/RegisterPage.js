import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import company from "../assets/company.svg";
import user from "../assets/user.svg";
import email from "../assets/email.svg";
import phone from "../assets/phone.svg";
import lock from "../assets/lock.svg";
import BlueButton from "../components/buttons/BlueButton";
import axiosInstance from "../api/axiosInstance";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyName: "",
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setLoading(true);

        try {
            const response = await axiosInstance.post("/auth/register", {
                companyName: formData.companyName,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            });

            if (response?.data?.success) {
                navigate("/verify-email", {
                    state: { email: formData.email }
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-darkGrey px-4 sm:px-6 py-8">
            <div className="w-full max-w-lg space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-black font-inter">Create your account</h1>
                    <p className="font-normal text-sm sm:text-base text-lightGrey mt-2">
                        Save your digital card so you can share it, edit it, and access it anytime
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-[0px_0px_8px_0px_#1D1D1F08] p-6 sm:p-8 lg:p-12 rounded-2xl space-y-6"
                >
                    <button
                        type="button"
                        className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 sm:py-4 hover:bg-gray-50 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />
                        Google
                    </button>

                    <div className="flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-400 text-sm">Or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="w-full">
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">
                            Company name (optional)
                        </label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={company} className="mx-3" alt="company" />
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Company name here"
                                className="flex-1 outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">
                            Full name
                        </label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={user} className="mx-3" alt="user" />
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Your name here"
                                className="flex-1 outline-none text-gray-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">
                            Email
                        </label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={email} className="mx-3" alt="email" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@email.com"
                                className="flex-1 outline-none text-gray-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">
                            Phone
                        </label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={phone} className="mx-3" alt="phone" />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+9193445233"
                                className="flex-1 outline-none text-gray-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">
                            Password
                        </label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={lock} className="mx-3" alt="lock" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Min. 8 characters"
                                className="flex-1 outline-none text-gray-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">
                            Confirm Password
                        </label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={lock} className="mx-3" alt="lock" />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="flex-1 outline-none text-gray-700"
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {loading && <p className="text-gray-500 text-sm">Creating account...</p>}

                    <BlueButton label="Create Account" width="w-full" type="submit" disabled={loading} />

                    <p className="text-center text-xs leading-4 text-lightBlack font-medium">
                        Already have an account?
                        <Link to="/login" className="text-lightBlue hover:underline ml-1">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;