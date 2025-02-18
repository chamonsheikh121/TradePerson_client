import React, { useContext } from "react";
import { AuthContext } from "../../../../../Authentication/AuthProvider";

const ProfileCompletion = ({ progress, w, h, heading }) => {
  const radius = 60;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const { user } = useContext(AuthContext);

  // Safely get profile picture URL with fallback
  const profileImageUrl = 
    user?.profilePicture || // Use the exact key from your backend
    user?.profileImage?.url || // Fallback if this structure exists
    '/default-profile.png'; // Fallback default image

  return (
    <div className="flex flex-col  items-center space-y-2 relative">
      {/* Circular Progress Container */}
      <div className={`relative  w-${w} h-${h} flex items-center justify-center`}>
        <svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          className="absolute z-50 w-full h-full"
        >
          {/* Background Circle */}
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress Circle */}
          <circle
            stroke="#ef44e4"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>
        {/* Profile Image */}
        <div className="absolute  w-44 h-44 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={profileImageUrl}
            alt="Profile"
            onError={(e) => {
              e.target.src = '/default-profile.png';
              e.target.onerror = null;
            }}
          />
        </div>
      </div>
      {/* Progress Text */}
      <p className="text-xl font-semibold">{progress}%</p>
      <p className="text-gray-500 text-sm uppercase">{heading}</p>
    </div>
  );
};

export default ProfileCompletion;