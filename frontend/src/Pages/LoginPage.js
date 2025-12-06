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
    const [googleLoaded, setGoogleLoaded] = useState(false)
    const [googleLoadError, setGoogleLoadError] = useState(false)

    useEffect(() => {
        const scriptId = 'gsi-client'

        const handleCredentialResponse = async (credentialResponse) => {
            // Called by GSI when the user signs in (credentialResponse.credential is the ID token)
            setLoading(true)
            setError("")
            try {
                const idToken = credentialResponse?.credential
                if (!idToken) throw new Error('Failed to obtain ID token from Google')
                const response = await axiosInstance.post('/auth/google', { idToken })
                const { token, user } = response?.data?.data || {}
                login(token, user)
                try { await refreshUser() } catch (e) { console.warn('refreshUser failed after Google login', e) }
                const from = location.state?.from?.pathname || "/create-link"
                const hasSubscription = (() => { try { const sub = user?.subscription; if (!sub || !sub.endDate) return false; return new Date(sub.endDate).getTime() > Date.now() } catch (e) { return false } })()
                if (user?.roles?.includes("superadmin")) navigate("/admin-dashboard")
                else if (!hasSubscription && from === '/smart-cards') navigate('/plans', { replace: true })
                else navigate(from, { replace: true })
            } catch (err) {
                console.error('GSI sign-in failed', err)
                const msg = err.response?.data?.message || err.message || 'Google sign-in failed'
                setError(msg)
                addToast(msg, { type: 'error' })
            } finally {
                setLoading(false)
            }
        }

        const handleLoad = () => {
            try {
                const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
                if (!clientId) {
                    console.warn('REACT_APP_GOOGLE_CLIENT_ID not set')
                    setGoogleLoadError(true)
                    return
                }

                if (window.google && window.google.accounts && window.google.accounts.id) {
                    // Initialize GSI
                    window.google.accounts.id.initialize({
                        client_id: clientId,
                        callback: handleCredentialResponse,
                        // auto_select: false,
                    })

                    // Render the default Google button into our container if present
                    const btnContainer = document.getElementById('gsi-button')
                    if (btnContainer) {
                        try {
                            window.google.accounts.id.renderButton(btnContainer, { theme: 'outline', size: 'large', width: '100%' })
                        } catch (e) {
                            // renderButton can throw if the container is not suitable; ignore and keep fallback
                            console.warn('GSI renderButton failed', e)
                        }
                    }

                    setGoogleLoaded(true)
                } else {
                    console.error('GSI client loaded but window.google.accounts.id not available')
                    setGoogleLoadError(true)
                }
            } catch (e) {
                console.error('Error initializing GSI', e)
                setGoogleLoadError(true)
            }
        }

        const handleError = (e) => {
            // Provide more debug info in console for the failing script
            try {
                const s = document.getElementById(scriptId)
                const src = s?.src || 'https://accounts.google.com/gsi/client'
                console.error('Failed to load GSI client', e, {
                    url: src,
                    online: navigator.onLine,
                    userAgent: navigator.userAgent
                })
            } catch (err) {
                console.error('Failed to log GSI script error', err)
            }
            setGoogleLoadError(true)
        }

        const existing = document.getElementById(scriptId)
        if (existing) {
            // If the GSI client script already exists, either initialize immediately
            // (if window.google is ready) or attach load/error handlers so we initialize when it finishes loading.
            if (window.google && window.google.accounts && window.google.accounts.id) {
                handleLoad()
            } else {
                existing.addEventListener('load', handleLoad)
                existing.addEventListener('error', handleError)
            }
        } else {
            const script = document.createElement('script')
            script.id = scriptId
            script.src = 'https://accounts.google.com/gsi/client'
            script.async = true
            script.defer = true
            script.addEventListener('load', handleLoad)
            script.addEventListener('error', handleError)
            document.body.appendChild(script)
        }

        return () => {
            // cleanup: remove any global listeners to prevent memory leaks
            const s = document.getElementById(scriptId)
            if (s) {
                try { s.removeEventListener('load', handleLoad) } catch (e) { }
                try { s.removeEventListener('error', handleError) } catch (e) { }
            }
        }
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
            const from = location.state?.from?.pathname || "/create-link"
            const hasSubscription = (() => { try { const sub = user?.subscription; if (!sub || !sub.endDate) return false; return new Date(sub.endDate).getTime() > Date.now() } catch (e) { return false } })()
            if (user?.roles?.includes("superadmin")) navigate("/admin-dashboard")
            else if (!hasSubscription && from === '/smart-cards') navigate('/plans', { replace: true })
            else navigate(from, { replace: true })
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password. Please try again.")
        } finally { setLoading(false) }
    }

    const handleGoogleSignIn = async () => {
        // Fallback for triggering GSI prompt when the official button isn't shown.
        setError("")
        if (!googleLoaded) {
            setError('Google SDK not loaded')
            return
        }
        try {
            if (window.google && window.google.accounts && window.google.accounts.id) {
                // prompt will show the One Tap/credential chooser if applicable
                window.google.accounts.id.prompt()
            } else {
                throw new Error('Google Identity API not available')
            }
        } catch (err) {
            console.error('Failed to trigger GSI prompt', err)
            setError(err.message || 'Google sign-in failed')
            addToast(err.message || 'Google sign-in failed', { type: 'error' })
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-darkGrey px-4 sm:px-6 py-8">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-black font-inter">Login</h1>
                    <p className="font-normal text-sm sm:text-base text-lightGrey mt-2">Save your digital card so you can share it, edit it, and access it anytime</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow-[0px_0px_8px_0px_#1D1D1F08] p-6 sm:p-8 lg:p-12 rounded-2xl space-y-6">
                    {/* Google Identity button will be rendered into this container when GSI loads */}
                    <div id="gsi-button" className="w-full mb-2 flex justify-center items-center"></div>

                    {/* Fallback/custom button when GSI is not available */}
                    {!googleLoaded && !googleLoadError && (
                        <button
                            type="button"
                            className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 sm:py-4 hover:bg-gray-50 transition disabled:opacity-60"
                            onClick={handleGoogleSignIn}
                            disabled={!googleLoaded || loading}
                            title={!googleLoaded ? 'Waiting for Google SDK to load' : ''}
                        >
                            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                            {!googleLoaded ? 'Loading…' : 'Google'}
                        </button>
                    )}

                    {googleLoadError && (
                        <button
                            type="button"
                            className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 sm:py-4 hover:bg-gray-50 transition opacity-60"
                            disabled
                        >
                            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                            Google Unavailable
                        </button>
                    )}

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
