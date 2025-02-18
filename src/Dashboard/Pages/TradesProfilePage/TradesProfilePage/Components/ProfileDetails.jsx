import { useEffect, useState } from "react";
import { FaCamera, FaCheck } from "react-icons/fa";
import userImage from "../../../../../files/user.jpg";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { toast } from "sonner";
import ProfileCompletion from "./ProfileCompletion";

const ProfileDetails = ({ profile }) => {
  // Safely extract nested data
  const user = profile?.user || {};
  const tradePersonProfile = profile || {};

  // State initialization with fallback values
  const [imagePreview, setImagePreview] = useState(
    user.profilePicture ||
    tradePersonProfile.profilePicture ||
    userImage
  );
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [experience, setExperience] = useState(tradePersonProfile.experience || "");
  const [bio, setBio] = useState(tradePersonProfile.bio || "");
  const [businessType, setBusinessType] = useState(tradePersonProfile.businessType || "");
  const [employeeCount, setEmployeeCount] = useState(tradePersonProfile.employeeCount || "");
  const [companyWebsite, setCompanyWebsite] = useState(tradePersonProfile.companyWebsite || "");
  const [companyName, setCompanyName] = useState(tradePersonProfile.companyName || "");
  const [progress, setProgress] = useState(tradePersonProfile.profileCompletionProgress || 0);

  const axiosSecure = useAxiosSecure();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProfileImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Debug log to see full profile data
  useEffect(() => {
    console.log('Full Profile Data:', profile);
  }, [profile]);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('phone', phone);
      formData.append('experience', experience);
      formData.append('bio', bio);
      formData.append('businessType', businessType);
      formData.append('employeeCount', employeeCount);
      formData.append('companyWebsite', companyWebsite);
      formData.append('companyName', companyName);

      if (profileImageFile) {
        formData.append('profileImage', profileImageFile);
      }

      const response = await axiosSecure.put('/profiles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="space-y-10 lg:px-20 rounded-md shadow-md bg-white p-6">
      {/* Profile Completion Indicator */}


      {/* Profile Image and Bio Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div>
          <div className="flex justify-center items-center relative">
            <div className="relative group border-2 overflow-hidden w-40 h-40 rounded-full">
              <img
                src={imagePreview}
                alt="Profile"
                className="  object-cover"
              />
              <label
                htmlFor="imageInput"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity cursor-pointer"
              >
                <FaCamera className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
          <h6 className="text-center mt-1">Profile Photo</h6>
        </div>
        <div className="flex-1">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write about your trade"
            className="textarea focus:outline-none h-40 w-full border border-gray-300 bg-gray-50 p-2 textarea-md"
          ></textarea>
          <h6 className="text-start mt-1">Bio</h6>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Profile Details Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"

              placeholder="Last Name"
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>
        </div>
        <div className="">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Phone"
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              type="text"
              placeholder="Experience"
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Business Type <span className="text-red-500">*</span>
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full px-4 py-3 border capitalize border-gray-400 bg-gray-50 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
            >
              <option value="">{businessType ? businessType : 'Select Business Type'}</option>
              <option value="Solo Trader">Solo Trader</option>
              <option value="Partnership">Partnership</option>
              <option value="Limited Liability Partnership">Limited Liability Partnership</option>
              <option value="Limited Company">Limited Company</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Employees <span className="text-red-500">*</span>
            </label>
            <input
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
              type="number"
              placeholder="Number of employees"
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Website URL <span className="text-red-500">*</span>
          </label>
          <input
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            type="text"
            placeholder="Company Website"
            className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="px-10 py-3 text-white bg-pink-500 hover:bg-pink-600 rounded-lg shadow-md transition-all duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileDetails;