import { useState } from "react";

const MembershipModal = ({ isEditing, packageData, onSave, onClose }) => {
    const [formData, setFormData] = useState(
        packageData || { name: "", price: "", credits: "", perCredit: "", benefits: "" }
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, perCredit: `£${(formData.price / formData.credits).toFixed(2)}` });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md transform scale-95 transition-transform duration-300">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    {isEditing ? "Edit Membership" : "Add New Membership"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-600 font-medium">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium">Price (£):</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium">Credits:</label>
                        <input
                            type="number"
                            name="credits"
                            value={formData.credits}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium">Benefits (comma-separated):</label>
                        <input
                            type="text"
                            name="benefits"
                            value={formData.benefits}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                        >
                            {isEditing ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MembershipModal;
