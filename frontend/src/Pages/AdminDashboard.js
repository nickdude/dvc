import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UsersTab from "./tabs/UsersTab"
import PlansTab from "./tabs/PlansTab"
import CardDesignsTab from "./tabs/CardDesignsTab"
import CardTemplatesTab from "./tabs/CardTemplatesTab"

const TABS = ["Users", "Plans", "Card Designs", "Card Templates"]

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("Users")
    const navigate = useNavigate()

    const handleLogout = () => {
        // Clear auth token or user session
        localStorage.removeItem("token")  // if you're storing token in localStorage
        sessionStorage.removeItem("token") // if session storage is used

        // Redirect to home
        navigate("/")
    }

    const renderTab = () => {
        switch (activeTab) {
            case "Users": return <UsersTab />
            case "Plans": return <PlansTab />
            case "Card Designs": return <CardDesignsTab />
            case "Card Templates": return <CardTemplatesTab />
            default: return <h1>Select a tab</h1>
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-4 border-b pb-2 mb-6">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-t-md font-medium ${activeTab === tab
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>{renderTab()}</div>
        </div>
    )
}

export default AdminDashboard
