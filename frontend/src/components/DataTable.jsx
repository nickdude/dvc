const DataTable = ({ data, columns, onEdit, onDelete }) => {
    return (
        <table className="w-full border-collapse border border-gray-200">
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={col.key} className="border px-4 py-2 text-left bg-gray-100">{col.label}</th>
                    ))}
                    <th className="border px-4 py-2 bg-gray-100">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map(row => (
                        <tr key={row._id}>
                            {columns.map(col => (
                                <td key={col.key} className="border px-4 py-2">{row[col.key]}</td>
                            ))}
                            <td className="border px-4 py-2">
                                <button className="text-blue-600 mr-2" onClick={() => onEdit(row)}>Edit</button>
                                <button className="text-red-600" onClick={() => onDelete(row._id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + 1} className="text-center py-4 text-gray-500">
                            No records found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default DataTable
