import { useEffect, useState } from "react"
import { useSearchParams, Link, useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"

const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [status, setStatus] = useState("idle") // idle | submitting | success | error
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            setStatus("error")
            setError("Invalid or missing token.")
        }
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!password || !confirmPassword) {
            setError("Both fields are required.")
            return
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setStatus("submitting")
        try {
            const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
                password,
            })

            if (res.status === 200) {
                setStatus("success")
                setTimeout(() => navigate("/login"), 2000) // auto redirect after 2s
            } else {
                setStatus("error")
                setError("Failed to reset password.")
            }
        } catch (err) {
            setStatus("error")
            setError(err.response?.data?.message || "Something went wrong.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                {status === "success" ? (
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-green-600 mb-4">
                            Password Reset 🎉
                        </h1>
                        <p className="text-gray-600 mb-4">
                            Your password has been successfully updated.
                        </p>
                        <Link
                            to="/login"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Go to Login
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                            Reset Password
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-600 text-sm mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Confirm new password"
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {status === "submitting" ? "Updating..." : "Reset Password"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default ResetPassword
