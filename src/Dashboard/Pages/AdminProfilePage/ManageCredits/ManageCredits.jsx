import React, { useState } from "react";

const ManageCredits = () => {
    const [credits, setCredits] = useState([
        { id: 1, credits: 10, price: 12.5, perCredit: 1.25 },
        { id: 2, credits: 20, price: 25, perCredit: 1.25 },
        { id: 3, credits: 45, price: 50, perCredit: 1.11 },
    ]);

    const [newCredit, setNewCredit] = useState({ credits: "", price: "" });
    const [editingCredit, setEditingCredit] = useState(null);

    const handleAddCredit = () => {
        const parsedCredits = parseFloat(newCredit.credits);
        const parsedPrice = parseFloat(newCredit.price);

        if (isNaN(parsedCredits) || isNaN(parsedPrice) || parsedCredits <= 0 || parsedPrice <= 0) return;

        const perCredit = (parsedPrice / parsedCredits).toFixed(2);
        setCredits([...credits, { id: Date.now(), credits: parsedCredits, price: parsedPrice, perCredit }]);
        setNewCredit({ credits: "", price: "" });
    };

    const handleEditCredit = (credit) => {
        setEditingCredit(credit);
        setNewCredit({ credits: credit.credits.toString(), price: credit.price.toString() });
    };

    const handleUpdateCredit = () => {
        const parsedCredits = parseFloat(newCredit.credits);
        const parsedPrice = parseFloat(newCredit.price);

        if (isNaN(parsedCredits) || isNaN(parsedPrice) || parsedCredits <= 0 || parsedPrice <= 0) return;

        setCredits(
            credits.map((c) =>
                c.id === editingCredit.id
                    ? { ...c, credits: parsedCredits, price: parsedPrice, perCredit: (parsedPrice / parsedCredits).toFixed(2) }
                    : c
            )
        );
        setEditingCredit(null);
        setNewCredit({ credits: "", price: "" });
    };

    const handleDeleteCredit = (id) => {
        setCredits(credits.filter((c) => c.id !== id));
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
            <h1 className="text-4xl font-semibold mb-6 text-gray-800">Manage Credits</h1>

            {/* Form Section */}
            <div className="bg-white p-6 w-full max-w-lg shadow-md rounded-md">
                <h2 className="text-2xl font-medium mb-4 text-center">
                    {editingCredit ? "Edit Credit Package" : "Add New Credit Package"}
                </h2>
                <div className="space-y-4">
                    <input
                        type="number"
                        placeholder="Credits"
                        value={newCredit.credits}
                        onChange={(e) => setNewCredit({ ...newCredit, credits: e.target.value })}
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Price (£)"
                        value={newCredit.price}
                        onChange={(e) => setNewCredit({ ...newCredit, price: e.target.value })}
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={editingCredit ? handleUpdateCredit : handleAddCredit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition"
                    >
                        {editingCredit ? "Update Credit" : "Add Credit"}
                    </button>
                </div>
            </div>

            {/* Credit Packages Table */}
            <div className="mt-8 w-full max-w-4xl">
                <h2 className="text-2xl font-medium mb-4 text-gray-800 text-center">Existing Credit Packages</h2>
                <div className="bg-white p-4 rounded-md shadow-md overflow-x-auto">
                    {credits.length ? (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-3 text-left">Credits</th>
                                    <th className="p-3 text-left">Price (£)</th>
                                    <th className="p-3 text-left">Per Credit (£)</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {credits.map((credit) => (
                                    <tr key={credit.id} className="border-t">
                                        <td className="p-3 min-w-32">{credit.credits}</td>
                                        <td className="p-3 min-w-32">£{credit.price.toFixed(2)}</td>
                                        <td className="p-3 min-w-32">£{credit.perCredit}</td>
                                        <td className="p-3 min-w-32 flex flex-wrap gap-2">
                                            <div className="flex w-full gap-4">
                                                <button onClick={() => handleEditCredit(credit)} className="bg-yellow-500 w-full px-3 py-2 text-white rounded">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDeleteCredit(credit.id)} className="bg-red-500 w-full px-3 py-2 text-white rounded">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500">No credit packages available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageCredits;
