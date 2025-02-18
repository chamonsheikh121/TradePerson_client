// src/Authentication/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { toast } from 'sonner';
import LoadingScreen from '../Components/LoadingScreen';
import { AuthContext } from './AuthProvider';
import { ROLES, ROLE_HIERARCHIES } from '../config/roles';

const ProtectedRoute = ({ children, requiredRoles = [ROLES.CUSTOMER] }) => {
  const { isAuthenticated, userRole, isLoading, user, checkAuth } = useContext(AuthContext);
  const location = useLocation();

  // Normalize and validate roles
  const normalizedUserRole = userRole?.toLowerCase();
  const normalizedRequiredRoles = requiredRoles.map(role => role.toLowerCase());

  // Debugging effect
  useEffect(() => {
    console.log('Protected Route Debug:', {
      isAuthenticated,
      userRole,
      isLoading,
      requiredRoles: normalizedRequiredRoles
    });
  }, [isAuthenticated, userRole, isLoading, requiredRoles]);

  // Loading state
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Authentication check
  if (!isAuthenticated) {
    console.log("object hi");
    toast.warning("Please log in to access this page.", {
      id: 'auth-warning',
      duration: 3000
    });
    return (
      <Navigate
        to="/account/login"
        state={{
          from: location.pathname,
          message: "You need to log in to access this page."
        }}
      />
    );
  }

  // Role-based access with hierarchical check
  const hasAccess = normalizedRequiredRoles.some(requiredRole =>
    ROLE_HIERARCHIES[requiredRole]?.includes(normalizedUserRole)
  );

  if (!hasAccess) {
    toast.error("You do not have permission to access this page.", {
      id: 'role-warning',
      duration: 3000
    });
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string)
};

export default ProtectedRoute;