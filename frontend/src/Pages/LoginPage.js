import React, { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import email from "../assets/email.svg"
import lock from "../assets/lock.svg"
import BlueButton from "../components/buttons/BlueButton"
import axiosInstance from "../api/axiosInstance"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"

const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, refreshUser } = useAuth()
    const { addToast } = useToast()

    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const scriptId = 'gapi-platform'
        if (document.getElementById(scriptId)) return

        const script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://apis.google.com/js/platform.js'
        script.async = true
        script.defer = true
        script.onload = () => {
            try {
                const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
                if (!clientId) return
                if (window.gapi && window.gapi.load) {
                    window.gapi.load('auth2', () => {
                        try { if (!window.gapi.auth2.getAuthInstance()) window.gapi.auth2.init({ client_id: clientId }) } catch (e) { }
                    })
                }
            } catch (e) { }
        }
        document.body.appendChild(script)
    }, [])

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const response = await axiosInstance.post("/auth/login", { email: formData.email, password: formData.password })
            const { token, user } = response?.data?.data || {}
            login(token, user)
            try { await refreshUser() } catch (e) { console.warn('refreshUser failed after login', e) }
            const from = location.state?.from?.pathname || "/plans"
            const hasSubscription = (() => { try { const sub = user?.subscription; if (!sub || !sub.endDate) return false; return new Date(sub.endDate).getTime() > Date.now() } catch (e) { return false } })()
            if (user?.roles?.includes("superadmin")) navigate("/admin-dashboard")
            else if (!hasSubscription && from === '/smart-cards') navigate('/plans', { replace: true })
            else navigate(from, { replace: true })
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password. Please try again.")
        } finally { setLoading(false) }
    }

    const handleGoogleSignIn = async () => {
        setError("")
        setLoading(true)
        try {
            if (!window.gapi || !window.gapi.auth2) throw new Error('Google SDK not loaded')
            const auth2 = window.gapi.auth2.getAuthInstance()
            if (!auth2) throw new Error('Google auth instance not available')
            const googleUser = await auth2.signIn()
            const idToken = googleUser.getAuthResponse().id_token
            if (!idToken) throw new Error('Failed to acquire id token from Google')
            const response = await axiosInstance.post('/auth/google', { idToken })
            const { token, user } = response?.data?.data || {}
            login(token, user)
            try { await refreshUser() } catch (e) { console.warn('refreshUser failed after Google login', e) }
            const from = location.state?.from?.pathname || "/plans"
            const hasSubscription = (() => { try { const sub = user?.subscription; if (!sub || !sub.endDate) return false; return new Date(sub.endDate).getTime() > Date.now() } catch (e) { return false } })()
            if (user?.roles?.includes("superadmin")) navigate("/admin-dashboard")
            else if (!hasSubscription && from === '/smart-cards') navigate('/plans', { replace: true })
            else navigate(from, { replace: true })
        } catch (err) {
            console.error(err)
            const msg = err.response?.data?.message || err.message || 'Google sign-in failed'
            setError(msg)
            addToast(msg, { type: 'error' })
        } finally { setLoading(false) }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-darkGrey px-4 sm:px-6 py-8">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-black font-inter">Login</h1>
                    <p className="font-normal text-sm sm:text-base text-lightGrey mt-2">Save your digital card so you can share it, edit it, and access it anytime</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow-[0px_0px_8px_0px_#1D1D1F08] p-6 sm:p-8 lg:p-12 rounded-2xl space-y-6">
                    <button type="button" className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 sm:py-4 hover:bg-gray-50 transition" onClick={handleGoogleSignIn}>
                        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" /> Google
                    </button>

                    <div className="flex items-center"><div className="flex-grow border-t border-gray-300"></div><span className="mx-4 text-gray-400 text-sm">Or</span><div className="flex-grow border-t border-gray-300"></div></div>

                    <div>
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">Email</label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={email} className="mx-3" alt="email" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@email.com" className="flex-1 outline-none text-gray-700" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">Password</label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={lock} className="mx-3" alt="lock" />
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Min. 8 characters" className="flex-1 outline-none text-gray-700" required />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {loading && <p className="text-gray-500 text-sm">Signing in...</p>}

                    <BlueButton label="Sign in" width="w-full" type="submit" disabled={loading} />

                    <p className="text-center text-xs leading-4 text-lightBlack font-medium">Don't have an account? <Link to="/register" className="text-lightBlue hover:underline ml-1">Sign up</Link> {" | "} <Link to="/forgot-password" className="text-lightBlue hover:underline ml-1">Forgot Password?</Link></p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
