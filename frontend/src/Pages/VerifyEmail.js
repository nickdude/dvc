import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"

const VerifyEmail = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token") // token from url
    const [status, setStatus] = useState("verifying") // verifying | success | error

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await axiosInstance.get(`/auth/verify-email?token=${token}`)
                console.log(res)
                if (res.status === 200) {
                    setStatus("success")
                } else {
                    setStatus("error")
                }
            } catch (err) {
                setStatus("error")
            }
        }

        if (token) {
            verifyToken()
        } else {
            setStatus("error")
        }
    }, [token])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
            <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center">
                {status === "verifying" && (
                    <>
                        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                            Verifying your email...
                        </h1>
                        <p className="text-gray-500">Please wait a moment</p>
                        <div className="mt-6 flex justify-center">
                            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                        </div>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h1 className="text-2xl font-semibold text-green-600 mb-4">
                            Email Verified 🎉
                        </h1>
                        <p className="text-gray-600">
                            Your email has been successfully verified. You can now log in.
                        </p>
                        <Link
                            to="/login"
                            className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Go to Login
                        </Link>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h1 className="text-2xl font-semibold text-red-600 mb-4">
                            Verification Failed ❌
                        </h1>
                        <p className="text-gray-600">
                            The verification link is invalid or expired.
                        </p>
                        <Link
                            to="/register"
                            className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Register Again
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default VerifyEmail
