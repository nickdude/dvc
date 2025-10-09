import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import BlueButton from "../../components/buttons/BlueButton";

const PlansTab = () => {
    const [plans, setPlans] = useState([]);
    const [newPlan, setNewPlan] = useState({
        title: "",
        price: "",
        subtitle: "",
        duration: ""
    });

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.get("/plans", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPlans(res.data.data);
        } catch (err) {
            console.error("Error fetching plans:", err);
        }
    };

    const addPlan = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.post("/plans", newPlan, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPlans([...plans, res.data.data]);
            setNewPlan({ title: "", price: "", subtitle: "", duration: "" });
        } catch (err) {
            console.error("Error adding plan:", err);
        }
    };

    const deletePlan = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axiosInstance.delete(`/plans/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPlans(plans.filter((p) => p._id !== id));
        } catch (err) {
            console.error("Error deleting plan:", err);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Manage Plans</h2>

            {/* Add New Plan */}
            <form onSubmit={addPlan} className="grid grid-cols-4 gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 rounded"
                    value={newPlan.title}
                    onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    className="border p-2 rounded"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Subtitle"
                    className="border p-2 rounded"
                    value={newPlan.subtitle}
                    onChange={(e) => setNewPlan({ ...newPlan, subtitle: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Duration (days)"
                    className="border p-2 rounded"
                    value={newPlan.duration}
                    onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                    required
                />
                <div className="col-span-4 flex justify-end">
                    <BlueButton type="submit" label="Add Plan" />
                </div>
            </form>

            {/* List Plans */}
            <ul className="space-y-2">
                {plans.map((plan) => (
                    <li
                        key={plan._id}
                        className="flex justify-between items-center border p-2 rounded"
                    >
                        <div>
                            <h3 className="font-semibold">{plan.title}</h3>
                            <p className="text-sm text-gray-600">{plan.subtitle}</p>
                            <p className="text-sm">
                                ₹{plan.price} • {plan.duration} days
                            </p>
                        </div>
                        <button
                            onClick={() => deletePlan(plan._id)}
                            className="text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlansTab;
