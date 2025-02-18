import { FaUserCircle, FaTasks } from "react-icons/fa";
import { useContext, useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../Shared/DashboardSidebar";
import MobileNavbar from "../Shared/MobileNav.jsx";
import { AuthContext } from "../../Authentication/AuthProvider.jsx";
import { ROLES } from '../../config/roles';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { userRole, user, logOut } = useContext(AuthContext);

  // Memoized role determination
  const normalizedRole = useMemo(() => {
    // Ensure role is lowercase and matches defined roles
    const role = userRole?.toLowerCase();
    
    // Validate against known roles
    switch (role) {
      case ROLES.CUSTOMER:
        return ROLES.CUSTOMER;
      case ROLES.TRADESPERSON:
        return ROLES.TRADESPERSON;
      case ROLES.ADMIN:
        return ROLES.ADMIN;
      default:
        console.warn('Unknown user role:', userRole);
        return null;
    }
  }, [userRole]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Early return if no valid role
  if (!normalizedRole) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You do not have a valid role assigned.
          </p>
          <button 
            onClick={logOut}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row text-gray-800 bg-gray-200 h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
      {/* Sidebar for medium and larger devices */}
      <DashboardSidebar
        userRole={normalizedRole}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Navbar and Sidebar for small devices */}
      <MobileNavbar userRole={normalizedRole} />

      {/* Main content area */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Welcome {user?.firstName || 'User'}
          </h2>
          <button
            onClick={logOut}
            className="px-7 btn-sm bg-pink-600 border-0 hover:bg-pink-700 text-white py-1 rounded-md flex justify-center items-center gap-2"
          >
            <FaUserCircle size={20} /> Log out
          </button>
        </div>
        <div className="mt-4 md:p-10 rounded-lg">
          <Outlet context={{ userRole: normalizedRole }} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;