


import { useState } from "react";
import MembershipModal from "./Components/MembershipModal";

const ManageMembershipPackage = () => {
    const [packages, setPackages] = useState([
        { id: 1, name: "Basic", price: 20, credits: 15, perCredit: "£1.33", benefits: ["Profile Page", "Directory listing", "Daily job alerts"] },
        { id: 2, name: "Pro", price: 54, credits: 50, perCredit: "£1.08", benefits: ["Profile Page", "Directory listing", "Instant job alerts"] },
        { id: 3, name: "Advanced", price: 75, credits: 75, perCredit: "£1.00", benefits: ["Profile Page", "Directory listing", "Priority job alerts"] },
    ]);

    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = (id) => {
        setPackages(packages.filter(pkg => pkg.id !== id));
    };

    const handleEdit = (pkg) => {
        setSelectedPackage(pkg);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setSelectedPackage(null);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleSave = (newPackage) => {
        if (isEditing) {
            setPackages(packages.map(pkg => (pkg.id === newPackage.id ? newPackage : pkg)));
        } else {
            setPackages([...packages, { ...newPackage, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto p-6 bg-white">
            <h2 className="text-3xl font-bold text-center my-10">Manage Memberships</h2>

            <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4" onClick={handleAddNew}>
                + Add Membership
            </button>

            <table className="w-full mb-20 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Credits</th>
                        <th className="border p-2">Per Credit</th>
                        <th className="border p-2">Benefits</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((pkg) => (
                        <tr key={pkg.id} className="text-center">
                            <td className="border p-2">{pkg.name}</td>
                            <td className="border p-2">£{pkg.price}</td>
                            <td className="border p-2">{pkg.credits}</td>
                            <td className="border p-2">{pkg.perCredit}</td>
                            <td className="border p-2">{pkg.benefits.join(", ")}</td>
                            <td className="border p-2">
                                <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEdit(pkg)}>Edit</button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(pkg.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <MembershipModal 
                    isEditing={isEditing} 
                    packageData={selectedPackage} 
                    onSave={handleSave} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </div>
    );
};

export default ManageMembershipPackage;
