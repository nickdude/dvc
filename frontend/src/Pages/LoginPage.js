import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import email from "../assets/email.svg"
import lock from "../assets/lock.svg"
import BlueButton from "../components/buttons/BlueButton"
import axiosInstance from "../api/axiosInstance"
import { useAuth } from "../contexts/AuthContext"

const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const response = await axiosInstance.post("/auth/login", {
                email: formData.email,
                password: formData.password,
            })

            const { token, user } = response?.data?.data

            // Use the auth context to log in
            login(token, user)

            // Redirect based on user role or previous location
            const from = location.state?.from?.pathname || "/plans"

            if (user?.roles?.includes("superadmin")) {
                navigate("/admin-dashboard")
            } else {
                navigate(from, { replace: true })
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Invalid email or password. Please try again."
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-100 flex items-center min-h-screen flex-col gap-4 bg-darkGrey pt-14">
            <h1 className="text-4xl font-semibold text-black font-inter">Login</h1>
            <p className="font-normal text-base text-lightGrey">
                Save your digital card so you can share it, edit it, and access it anytime
            </p>

            <form
                onSubmit={handleSubmit}
                className="flex justify-center flex-col items-center bg-white shadow-[0px_0px_8px_0px_#1D1D1F08] mt-10 p-12 rounded-2xl"
            >
                <button
                    type="button"
                    className="w-[32vw] flex items-center justify-center border border-gray-300 rounded-lg py-4 hover:bg-gray-50 transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google"
                        className="w-5 h-5 mr-2"
                    />
                    Google
                </button>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-400 text-sm">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-xs leading-4 text-lightBlack font-medium mb-1">
                        Email
                    </label>
                    <div className="flex items-center border rounded-lg py-2">
                        <img src={email} className="mx-3" alt="email" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@email.com"
                            className="w-[28vw] outline-none text-gray-700"
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-xs leading-4 text-lightBlack font-medium mb-1">
                        Password
                    </label>
                    <div className="flex items-center border rounded-lg py-2">
                        <img src={lock} className="mx-3" alt="lock" />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Min. 8 characters"
                            className="w-[28vw] outline-none text-gray-700"
                            required
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {loading && <p className="text-gray-500 text-sm mb-2">Signing in...</p>}

                <BlueButton label="Sign in" width="w-[28vw]" type="submit" disabled={loading} />

                <p className="block text-xs leading-4 text-lightBlack font-medium mt-4">
                    Don't have an account?
                    <Link to="/register" className="text-lightBlue hover:underline ml-1">
                        Sign up
                    </Link>
                    {" | "}
                    <Link to="/forgot-password" className="text-lightBlue hover:underline ml-1">
                        Forgot Password?
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default LoginPage
