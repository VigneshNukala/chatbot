import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, verificationCode } = location.state || {}; // Get passed form data and code
  const [userCode, setUserCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const handleCodeChange = (e) => {
    setUserCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Compare entered code with the one that was sent via email
    if (parseInt(userCode) === verificationCode) {
      setIsVerified(true);
      setError("");
      navigate('/organization')
    } else {
      setError("Invalid verification code.");
    }
  };

  useEffect(() => {
    if (!formData || !verificationCode) {
      navigate("/register"); 
    }
  }, [formData, verificationCode]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-0 bg-gradient-to-br from-gray-900 via-blue-800 to-teal-500">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Verify your email
        </h2>
        <p className="text-gray-600 mt-4">We've sent a verification code to {formData?.email}.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <input
            type="text"
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer"
            placeholder="Enter verification code"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            Verify & Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
        {isVerified && <p>Your email has been verified!</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Verify;
