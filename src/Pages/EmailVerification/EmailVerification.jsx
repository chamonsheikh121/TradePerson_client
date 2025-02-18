import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState({
    loading: true,
    success: false,
    message: ''
  });
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Extract token from URL
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (!token) {
      setVerificationStatus({
        loading: false,
        success: false,
        message: 'No verification token found.'
      });
      return;
    }

    // Verify email
    const verifyEmail = async () => {
      try {
        const response = await axiosSecure.get(`/auth/verify-email/${token}`);
        
        // Show success toast
        toast.success(response.data.message || 'Email verified successfully');

        setVerificationStatus({
          loading: false,
          success: true,
          message: response.data.message || 'Email verified successfully'
        });

        // Redirect to login after successful verification
        setTimeout(() => {
          navigate('/account/login', { 
            state: { 
              verificationMessage: response.data.message 
            } 
          });
        }, 2000);

      } catch (error) {
        console.error('Verification error:', error.response || error);

        // Show error toast
        toast.error(error.response?.data?.message || 'Email verification failed');

        setVerificationStatus({
          loading: false,
          success: false,
          message: error.response?.data?.message || 'Email verification failed.'
        });
      }
    };

    verifyEmail();
  }, [location.search, navigate, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        {verificationStatus.loading ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Verifying Email...</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-500"></div>
            </div>
          </div>
        ) : (
          <>
            <h2 className={`text-2xl font-bold mb-4 ${verificationStatus.success ? 'text-green-600' : 'text-red-600'}`}>
              {verificationStatus.success ? 'Email Verified' : 'Verification Failed'}
            </h2>
            <p className="text-gray-700 mb-6">{verificationStatus.message}</p>
            
            {verificationStatus.success ? (
              <div className="text-green-600 flex items-center justify-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Redirecting to login page...
              </div>
            ) : (
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => navigate('/account/login')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Go to Login
                </button>
                <button 
                  onClick={() => navigate('/account/resend-verification', { 
                    state: { email: location.state?.email } 
                  })}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
                >
                  Resend Verification
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;