import { useState, useEffect } from "react"
import axiosInstance from "../../api/axiosInstance"
import DataTable from "../../components/DataTable"
import ModalForm from "../../components/ModalForm"

const UsersTab = () => {
    const [userPlans, setUserPlans] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({})
    const [editingUser, setEditingUser] = useState(null)

    const fetchUserPlans = async () => {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/user-plans", {
            headers: { Authorization: `Bearer ${token}` },
        })
        setUserPlans(res.data.data)
    }

    useEffect(() => {
        fetchUserPlans()
    }, [])

    const handleAdd = () => {
        setEditingUser(null)
        setFormData({})
        setShowModal(true)
    }

    const handleEdit = (userPlan) => {
        setEditingUser(userPlan)
        setFormData({
            name: userPlan.user?.name || "",
            email: userPlan.user?.email || "",
            role: userPlan.user?.roles?.[0] || "",
        })
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        await axiosInstance.delete(`/users/${id}`)
        fetchUserPlans()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editingUser) {
            await axiosInstance.put(`/users/${editingUser.user._id}`, formData)
        } else {
            await axiosInstance.post("/auth/register", formData)
        }
        fetchUserPlans()
        setShowModal(false)
    }

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Users</h2>
                <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded">
                    + Add User
                </button>
            </div>

            <DataTable
                data={userPlans.map(item => ({
                    _id: item._id,
                    name: item.user?.name,
                    email: item.user?.email,
                    role: item.user?.roles?.join(", "),
                    plan: item.plan?.title,
                    paymentStatus: item.paymentStatus,
                    startDate: new Date(item.startDate).toLocaleDateString(),
                    endDate: new Date(item.endDate).toLocaleDateString()
                }))}
                columns={[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    { key: "role", label: "Role" },
                    { key: "plan", label: "Plan" },
                    { key: "paymentStatus", label: "Payment" },
                    { key: "startDate", label: "Start Date" },
                    { key: "endDate", label: "End Date" }
                ]}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {showModal && (
                <ModalForm
                    title={editingUser ? "Edit User" : "Add User"}
                    fields={[
                        { name: "name", label: "Name", type: "text" },
                        { name: "email", label: "Email", type: "email" },
                        {
                            name: "roles",
                            label: "Role",
                            type: "select",
                            options: ["admin", "user", "superadmin"] // you can expand dynamically
                        },
                        {
                            name: "accountType",
                            label: "Account Type",
                            type: "select",
                            options: ["individual", "company"]
                        },
                        { name: "companyName", label: "Company", type: "text" },
                        { name: "phone", label: "Phone", type: "text" },
                        { name: "password", label: "Password", type: "password" }
                    ]}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    onClose={() => setShowModal(false)}
                />

            )}
        </div>
    )
}

export default UsersTab
