import PropTypes from "prop-types";
import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { ROLES } from "../config/roles";  

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  
  const axiosSecure = useAxiosSecure();

  // Normalize and validate role
  const normalizeRole = useCallback((role) => {
    const normalizedRole = role?.toLowerCase();
    return Object.values(ROLES).includes(normalizedRole) 
      ? normalizedRole 
      : null;
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosSecure.get("/auth/jwt");
      
      if (response.data?.success) {
        // Normalize the role
        const validRole = normalizeRole(response.data.user.role);
        
        setUserRole(validRole);
        setUser(response.data.user);
        setIsAuthenticated(!!validRole);
      } else {
        throw new Error("Authentication check failed");
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      setUser(null);
      setUserRole(null);
    } finally {
      setIsLoading(false);
    }
  }, [axiosSecure, normalizeRole]);

  const loginSuccess = useCallback(async () => {
    try {
      await checkAuth();
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
      setIsAuthenticated(false);
    }
  }, [checkAuth]);

  const logOut = useCallback(async () => {
    try {
      const res = await axiosSecure.post(`/auth/logout`);
      
      // Reset authentication state
      setIsAuthenticated(false);
      setUser(null);
      setUserRole(null);
      
      // Show success toast
      toast.success(res?.data?.message || "Logout successful");
      
      // Redirect to home
      window.location.href = '/';
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  }, [axiosSecure]);

  // Initial authentication check on mount
  useEffect(() => {
    const performInitialCheck = async () => {
      if (!isAuthenticated) {
        await checkAuth();
      }
    };

    performInitialCheck();
  }, [checkAuth, isAuthenticated]);

  // Prepare context value
  const value = {
    isAuthenticated,
    isLoading,
    userRole,
    user,
    logOut,
    loginSuccess,
    checkAuth,
    // Expose roles for easy access
    ROLES
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;