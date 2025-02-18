// src/components/auth/Login.jsx
import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "sonner";
import { AuthContext } from "../../Authentication/AuthProvider";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { loginSuccess } = useContext(AuthContext);
  const location = useLocation();

  // Check for verification message from email verification or resend
  useEffect(() => {
    if (location.state?.verificationMessage) {
      setVerificationMessage(location.state.verificationMessage);
      
      // Clear the state to prevent showing the message again
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }
  
    setLoading(true);
  
    try {
      // Make the login request
      const res = await axiosSecure.post('/auth/login', {
        email: formData.email,
        password: formData.password,
        remember: formData.remember
      });
  
      if (res.data?.success) {
        toast.success(res.data.message || "Login successful");
        await loginSuccess();
        
        // Role-based redirection
        const userRole = res.data?.user?.role;
        let redirectPath = location?.state?.from || '/';
        
        // Set redirection path based on role
        if (userRole === 'customer') {
          redirectPath = '/customer/dashboard';
        } else if (userRole === 'tradesPerson') {
          redirectPath = '/tradePerson/dashboard';
        } else if (userRole === 'admin') {
          redirectPath = '/admin/dashboard';
        }
  
        // Navigate after a small delay
        setTimeout(() => {
          navigate(redirectPath);
        }, 500);
      } else {
        throw new Error(res.data?.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error details:', error.response?.data);
      
      // Handle email verification required
      if (error.response?.data?.emailVerificationRequired) {
        toast.error("Please verify your email before logging in.");
        navigate('/resend-verification', { 
          state: { 
            email: formData.email 
          } 
        });
        return;
      }

      // Generic error handling
      toast.error(
        error.response?.data?.message || 
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>
        
        {/* Verification Message */}
        {verificationMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            {verificationMessage}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              required
              disabled={loading}
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-400"
                disabled={loading}
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link
              to="/account/password-reset"
              className="text-sm text-blue-500 hover:underline"
              tabIndex={loading ? -1 : 0}
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : "Sign in"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link 
            to="/register-as" 
            className="text-blue-500 hover:underline"
            tabIndex={loading ? -1 : 0}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;