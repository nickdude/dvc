const ModalForm = ({ title, fields, formData, setFormData, onSubmit, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg w-[400px]">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    {fields.map(f => (
                        <div key={f.name}>
                            <label className="block text-sm font-medium mb-1">{f.label}</label>
                            <input
                                type={f.type}
                                name={f.name}
                                value={formData[f.name] || ""}
                                onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                                className="w-full border px-3 py-2 rounded-md"
                                required
                            />
                        </div>
                    ))}
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalForm
