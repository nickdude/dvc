import { useState } from "react"
import axiosInstance from "../api/axiosInstance"

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axiosInstance.post("/auth/forgot-password", { email })
            setMessage(res.data.message || "Reset link sent to your email")
            setError("")
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
            setMessage("")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-darkGrey">
            <div className="bg-white p-8 rounded-2xl shadow-md w-[30vw]">
                <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your email address and we'll send you a reset link.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@email.com"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-lightBlue"
                            required
                        />
                    </div>

                    {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
                    {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-lightBlue text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
