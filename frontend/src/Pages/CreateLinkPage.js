import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import company from '../assets/company.svg'
import user from '../assets/user.svg'
import emailIcon from '../assets/email.svg'
import phone from '../assets/phone.svg'
import lock from '../assets/lock.svg'
import BlueButton from '../components/buttons/BlueButton'
import { createInstavizLink } from '../services/instavizService'
import { saveCard } from '../services/cardService'
import { useToast } from '../contexts/ToastContext'

const CreateLinkPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        user_name: '',
        user_designation: '',
        user_email: '',
        user_contact_number: '',
        user_address: '',
        facebook_url: '',
        x_url: '',
        linkedin_url: '',
        templateid: '1'
    })
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [responseData, setResponseData] = useState(null)

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const handleFile = (e) => setFile(e.target.files?.[0] || null)

    const { addToast } = useToast()

    const fileToDataUrl = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const fd = new FormData()
            Object.keys(formData).forEach((k) => fd.append(k, formData[k]))
            if (file) fd.append('profile_picture', file)

            const res = await createInstavizLink(fd)

            // extract external URL from response (support several shapes)
            const externalUrl = res?.url || res?.link || (res?.data && (res.data.url || res.data.link)) || null

            // attempt to save a minimal card record in our backend so it appears under /my-cards
            try {
                let base64 = null
                if (file) {
                    try {
                        base64 = await fileToDataUrl(file)
                    } catch (err) {
                        console.warn('Failed to convert image to base64', err)
                    }
                }

                const cardPayload = {
                    name: formData.user_name || 'Untitled',
                    jobTitle: formData.user_designation || '',
                    email: formData.user_email || '',
                    phone: formData.user_contact_number || '',
                    address: formData.user_address || '',
                    templateId: formData.templateid || '1',
                    isPublic: true,
                    profileImage: base64,
                    externalUrl
                }

                await saveCard(cardPayload)
                addToast('Saved card to your profile', { type: 'success' })
            } catch (saveErr) {
                console.warn('Failed to save created card to backend', saveErr)
                addToast('Created link but failed to save card to profile', { type: 'error' })
            }

            // Navigate to the CardCreated page and pass the API response via location state
            navigate('/card-created', { state: { data: res } })
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.message || 'Failed to create link')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-darkGrey px-4 sm:px-6 py-8">
            <div className="w-full max-w-lg space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-black font-inter">Create Shareable Link</h1>
                    <p className="font-normal text-sm sm:text-base text-lightGrey mt-2">Fill the details to create a public link for your digital card</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow-[0px_0px_8px_0px_#1D1D1F08] p-6 sm:p-8 lg:p-12 rounded-2xl space-y-6">
                    <div className="w-full">
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">Full name</label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={user} className="mx-3" alt="user" />
                            <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} placeholder="Your name here" className="flex-1 outline-none text-gray-700" required />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">Designation</label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={company} className="mx-3" alt="company" />
                            <input type="text" name="user_designation" value={formData.user_designation} onChange={handleChange} placeholder="Developer" className="flex-1 outline-none text-gray-700" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">Email</label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={emailIcon} className="mx-3" alt="email" />
                            <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} placeholder="name@email.com" className="flex-1 outline-none text-gray-700" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">Contact number</label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={phone} className="mx-3" alt="phone" />
                            <input type="text" name="user_contact_number" value={formData.user_contact_number} onChange={handleChange} placeholder="+9193445233" className="flex-1 outline-none text-gray-700" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">Address</label>
                        <div className="flex items-center border rounded-lg py-2 sm:py-3">
                            <img src={company} className="mx-3" alt="address" />
                            <input type="text" name="user_address" value={formData.user_address} onChange={handleChange} placeholder="Your address" className="flex-1 outline-none text-gray-700" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">Facebook</label>
                            <input name="facebook_url" value={formData.facebook_url} onChange={handleChange} placeholder="fb.com/your" className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">X / Twitter</label>
                            <input name="x_url" value={formData.x_url} onChange={handleChange} placeholder="x.com/your" className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">LinkedIn</label>
                            <input name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} placeholder="linkedin.com/in/your" className="w-full border rounded px-3 py-2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">Template</label>
                        <select name="templateid" value={formData.templateid} onChange={handleChange} className="w-full border rounded px-3 py-2">
                            <option value="1">Template 1</option>
                            <option value="2">Template 2</option>
                            <option value="3">Template 3</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs leading-4 text-lightBlack font-medium mb-2">Profile picture</label>
                        <input type="file" accept="image/*" onChange={handleFile} />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {/* response is handled by navigating to the CardCreated page */}

                    <BlueButton label={loading ? 'Creating…' : 'Create Link'} width="w-full" type="submit" disabled={loading} />
                </form>
            </div>
        </div>
    )
}

export default CreateLinkPage
