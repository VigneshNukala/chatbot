import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";

// Register Component
const Register = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState("");

  const handleHoverStart = (e) => {
    setTimeout(() => {
      setShowForm(true);
    }, 200);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Submitting the Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem("verificationCode", verificationCode);
    const templateParams = {
      to_name: formData.name,
      to_email: formData.email,
      code: verificationCode,
    };

    try {
      // Send email with verification code using EmailJS
      await emailjs.send(
        "service_k78ciwf",
        "template_ggmwn2h",
        templateParams,
        "z9LfVzx_GKjZMEQfH"
      );

      setIsCodeSent(true);
      setError("");

      // Navigate to the verify page and pass the form data using state
      navigate("/verify", {
        state: {
          formData: formData,
          verificationCode: verificationCode,
        },
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Failed to send verification code.");
    }
  };

  //Render
  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 sm:px-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/bg.jpg')` }}
    >
      {/*Shows the Register Button to hover */}
      {!showForm && (
        <motion.div
          onHoverStart={handleHoverStart}
          className="px-6 py-3 text-gray-800 cursor-pointer bg-white rounded-lg text-lg font-semibold transition duration-300 hover:bg-gray-200"
          whileHover={{ scale: 1.05 }}
        >
          Hover to Register
        </motion.div>
      )}

      {/*Register Form*/}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside form
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center text-gray-800"
          >
            Register
          </motion.h2>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <label className="text-gray-500 text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <label className="text-gray-500 text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <label className="text-gray-500 text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </motion.div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg text-lg font-semibold transition duration-300 hover:bg-teal-700"
            >
              Register
            </motion.button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Sign-in */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-lg font-semibold bg-white text-gray-700 hover:bg-gray-100 transition duration-300"
          >
            <FaGoogle className="mr-2 text-red-500" />
            Continue with Google
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Register;
