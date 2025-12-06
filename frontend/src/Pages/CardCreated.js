import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import QRCodeGenerator from '../components/QRCodeGenerator'
import CardShare from '../components/CardShare'
import BlueButton from '../components/buttons/BlueButton'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

const CardCreated = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useAuth()

    // The external API response is expected in location.state.data
    const data = location.state?.data || null

    // Try to extract a usable public URL from common response fields
    const cardUrl = React.useMemo(() => {
        if (!data) return null
        // common patterns: data.url, data.link, data.data?.link, data.data?.url
        return data.url || data.link || (data.data && (data.data.url || data.data.link)) || null
    }, [data])

    const handleCustomize = () => {
        // If user has an active subscription, go to /smart-cards, else to /plans
        try {
            const sub = user?.subscription
            const hasActive = sub && sub.endDate && new Date(sub.endDate).getTime() > Date.now()
            if (hasActive) navigate('/smart-cards')
            else navigate('/plans')
        } catch (e) {
            navigate('/plans')
        }
    }

    if (!data) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-darkGrey px-4 py-8">
                <div className="max-w-lg w-full bg-white p-8 rounded-2xl text-center">
                    <h2 className="text-xl font-semibold mb-4">No card data</h2>
                    <p className="text-sm text-gray-600 mb-6">It seems we don't have the created card details. Please try creating the link again.</p>
                    <BlueButton label="Create link" width="w-full" onClick={() => navigate('/create-link')} />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-darkGrey px-4 py-8">
            <div className="max-w-2xl w-full bg-white p-8 rounded-2xl space-y-6">
                <h2 className="text-2xl font-semibold">Your shareable link is ready</h2>
                {cardUrl ? (
                    <div className="space-y-6">
                        {/* Main area: QR on left, share on right */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* QR square card */}
                            <div className="flex justify-center md:justify-start">
                                <div className="bg-white rounded-xl shadow-xl p-4 flex items-center justify-center" style={{ width: 280, height: 280 }}>
                                    <QRCodeGenerator value={cardUrl} size={240} />
                                </div>
                            </div>

                            {/* Share column */}
                            <div className="flex flex-col justify-center">
                                <h3 className="text-sm font-medium mb-4">Share</h3>
                                <div className="space-y-4">
                                    <ShareBlock cardUrl={cardUrl} />
                                    <p className="text-sm text-gray-500">You can share this link or download the QR code to print or display it.</p>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons - large pill style */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <BlueButton label="Customize template" width="w-full md:mx-0" onClick={handleCustomize} />
                            <BlueButton label="Create another" width="w-full md:mx-0" onClick={() => navigate('/create-link')} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm text-gray-600">Created response received but no public URL was found.</p>
                        <pre className="mt-4 text-xs bg-gray-50 p-3 rounded overflow-auto">{JSON.stringify(data, null, 2)}</pre>
                        <div className="mt-4 flex gap-4">
                            <BlueButton label="Create another" width="flex-1" onClick={() => navigate('/create-link')} />
                            <BlueButton label="Customize template" width="flex-1" onClick={handleCustomize} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardCreated

// Small wrapper to open CardShare modal with an explicit external URL
function ShareBlock({ cardUrl }) {
    const [open, setOpen] = useState(false)
    const { addToast } = useToast()

    return (
        <div>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Open share options
                </button>
                <button
                    onClick={async () => {
                        try {
                            await navigator.clipboard.writeText(cardUrl)
                            addToast('Link copied to clipboard', { type: 'success' })
                        } catch (e) {
                            console.error('copy failed', e)
                            addToast('Failed to copy link', { type: 'error' })
                        }
                    }}
                    className="px-3 py-2 border rounded-md"
                >
                    Copy link
                </button>
            </div>

            <CardShare isOpen={open} onClose={() => setOpen(false)} cardUrl={cardUrl} cardData={{ name: 'Shared Card' }} />
        </div>
    )
}
