import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import BlueButton from "../../components/buttons/BlueButton";

const CardTemplatesTab = () => {
    const [templates, setTemplates] = useState([]);
    const [newTemplate, setNewTemplate] = useState({ name: "", description: "" });

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const res = await axiosInstance.get("/card-templates");
            setTemplates(res.data.data);
        } catch (err) {
            console.error("Error fetching templates:", err);
        }
    };

    const addTemplate = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/card-templates", newTemplate);
            setTemplates([...templates, res.data.data]);
            setNewTemplate({ name: "", description: "" });
        } catch (err) {
            console.error("Error adding template:", err);
        }
    };

    const deleteTemplate = async (id) => {
        try {
            await axiosInstance.delete(`/card-templates/${id}`);
            setTemplates(templates.filter((t) => t._id !== id));
        } catch (err) {
            console.error("Error deleting template:", err);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Manage Card Templates</h2>

            {/* Add New Template */}
            <form onSubmit={addTemplate} className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Template Name"
                    className="border p-2 rounded w-1/3"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="border p-2 rounded w-1/2"
                    value={newTemplate.description}
                    onChange={(e) =>
                        setNewTemplate({ ...newTemplate, description: e.target.value })
                    }
                    required
                />
                <BlueButton type="submit" label="Add Template" />
            </form>

            {/* List Templates */}
            <ul className="space-y-2">
                {templates.map((template) => (
                    <li
                        key={template._id}
                        className="flex justify-between items-center border p-2 rounded"
                    >
                        <span>
                            {template.name} - {template.description}
                        </span>
                        <button
                            onClick={() => deleteTemplate(template._id)}
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

export default CardTemplatesTab;
