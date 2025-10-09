import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import BlueButton from "../../components/buttons/BlueButton";

const CardDesignsTab = () => {
    const [designs, setDesigns] = useState([]);
    const [newDesign, setNewDesign] = useState({
        name: "",
        type: "",
        description: "",
        price: "",
        image: ""
    });

    useEffect(() => {
        fetchDesigns();
    }, []);

    const fetchDesigns = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.get("/card-design", { headers: { Authorization: `Bearer ${token}` } });
            console.log("Fetched designs:", res.data.data);
            setDesigns(res.data.data);
        } catch (err) {
            console.error("Error fetching designs:", err);
        }
    };

    const addDesign = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.post("/card-design", newDesign, { headers: { Authorization: `Bearer ${token}` } });
            setDesigns([...designs, res.data.data]);
            setNewDesign({ name: "", type: "", description: "", price: "", image: "" });
        } catch (err) {
            console.error("Error adding design:", err);
        }
    };

    const deleteDesign = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axiosInstance.delete(`/card-design/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            setDesigns(designs.filter((d) => d._id !== id));
        } catch (err) {
            console.error("Error deleting design:", err);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Manage Card Designs</h2>

            {/* Add New Design */}
            <form onSubmit={addDesign} className="grid grid-cols-5 gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 rounded"
                    value={newDesign.name}
                    onChange={(e) => setNewDesign({ ...newDesign, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Type"
                    className="border p-2 rounded"
                    value={newDesign.type}
                    onChange={(e) => setNewDesign({ ...newDesign, type: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="border p-2 rounded"
                    value={newDesign.description}
                    onChange={(e) => setNewDesign({ ...newDesign, description: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    className="border p-2 rounded"
                    value={newDesign.price}
                    onChange={(e) => setNewDesign({ ...newDesign, price: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    className="border p-2 rounded"
                    value={newDesign.image}
                    onChange={(e) => setNewDesign({ ...newDesign, image: e.target.value })}
                    required
                />
                <div className="col-span-5">
                    <BlueButton type="submit" label="Add Design" />
                </div>
            </form>

            {/* List Designs */}
            <div className="grid grid-cols-4 gap-4">
                {designs.map((design) => (
                    <div key={design._id} className="border p-3 rounded shadow-sm">
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/${design.image}`} // ✅ dynamic from backend
                            alt={design.name}
                            className="w-full h-80 object-cover rounded"
                        />
                        <div className="mt-2">
                            <h3 className="font-semibold">{design.name}</h3>
                            <p className="text-sm text-gray-600">{design.description}</p>
                            <p className="text-sm">Type: {design.type}</p>
                            <p className="text-sm font-bold">₹{design.price}</p>
                        </div>
                        <button
                            onClick={() => deleteDesign(design._id)}
                            className="mt-2 text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardDesignsTab;
