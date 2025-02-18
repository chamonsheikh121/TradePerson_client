import React, { useEffect, useState } from "react";
import ProfileDetails from "./TradesProfilePage/Components/ProfileDetails";
import ProfileHeader from "./TradesProfilePage/Components/ProfileHeader";
import JobGalleries from "./TradesProfilePage/Components/JobGalleries";
import HomeAddress from "./TradesProfilePage/Components/HomeAddress";
import BusinessAddress from "./TradesProfilePage/Components/BusinessAddress";
import TradeAndSkills from "./TradesProfilePage/Components/TradeAndSkills";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "sonner"; 

const tabList = [
  { key: "profile", label: "Profile Details" },
  { key: "gallery", label: "Job Galleries" },
  { key: "skills", label: "Trade & Skills" },
  { key: "home", label: "Home Address" },
  { key: "business", label: "Business Address" },
];

const TradesProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

 useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Change the endpoint to match your backend routes
      const response = await axiosSecure.get("/profiles");
      
      console.log('Full Response:', response);
      console.log('Response Data:', response.data);

      if (response.data?.success) {
        setProfile(response.data.profile);
      } else {
        throw new Error("No profile data found");
      }
    } catch (error) {
      console.error("Full Profile fetch error:", error);
      setError(
        error.response?.data?.message || 
        error.message || 
        "Failed to load profile"
      );
      toast.error("Failed to load profile", {
        description: error.response?.data?.message || error.message
      });
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [axiosSecure]);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
       <p>Loading... </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Error Loading Profile
        </h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // No Profile Data
  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">No Profile Found</h2>
          <p className="text-gray-600 mb-6">
            Please complete your profile registration
          </p>
          <button 
            onClick={() => {/* Navigate to profile completion */}}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Complete Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto text-gray-700 p-6">
      {/* Profile Header (Always Visible) */}
      <ProfileHeader profile={profile} />

      {/* Modern Tabs Navigation */}
      <div className="relative flex justify-start border-b border-gray-300 gap-6 overflow-x-auto mt-6">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            className={`relative px-6 py-3 transition-all duration-300 ${
              activeTab === tab.key
                ? "text-blue-600 bg-white rounded-md"
                : "text-gray-500 rounded-md bg-gray-100 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 bottom-0 h-[3px] bg-blue-600 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content with Smooth Transition */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        {activeTab === "profile" && <ProfileDetails profile={profile} />}
        {activeTab === "gallery" && <JobGalleries profile={profile} />}
        {activeTab === "skills" && <TradeAndSkills profile={profile} />}
        {activeTab === "home" && <HomeAddress profile={profile} />}
        {activeTab === "business" && <BusinessAddress profile={profile} />}
      </motion.div>
    </div>
  );
};

export default TradesProfilePage;