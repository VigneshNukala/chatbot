import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useLocation } from "react-router-dom";

import {
  Chrome,
  AlertCircle,
  Mail,
  Check,
  MessageSquare,
  ChevronRight,
  Facebook,
  Twitter,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

import Confetti from "./Confetti";
import Navbar from "./Navbar";

//Integraion Component
const Integration = () => {
  const location = useLocation();
  const companyData = location.state || {};
  const [activeTab, setActiveTab] = useState("test");
  const [showConfetti, setShowConfetti] = useState(false);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(3);
  const [integrationFailed, setIntegrationFailed] = useState(false); // New state for integration failure

  //Form Submission Handle
  const handleTestSuccess = () => {
    setShowConfetti(true);
    setActiveTab("success");
    setCurrentStep(4);
    window.scrollTo(0, 0);
  };

  //Close chatbot Handle
  const handleCloseChatbot = () => {
    setChatbotVisible(false);
  };

  //Open chatbot Handle
  const handleOpenChatbot = () => {
    setChatbotVisible(true);
  };

  //Feedback slider Toggle
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  //Function to send Email about Instructions
  const sendEmailInstructions = () => {
    const templateParams = {
      to_name: companyData.email,
      company_name: companyData.name || "Your Company",
      instructions: `<script src="https://cdn.chatbot.ai/widget.js"></script>
                      <script>
                        window.ChatbotAI.init({apiKey: 'your-api-key'});
                      </script>`,
    };

    emailjs
      .send(
        "service_0o31jhh",
        "template_ggmwn2h",
        templateParams,
        "z9LfVzx_GKjZMEQfH"
      )
      .then((response) => {
        console.log("Email sent successfully", response);
        alert("Instructions sent to the developer!");
      })
      .catch((error) => {
        console.error("Failed to send email", error);
        alert("There was an issue sending the email.");
      });
  };

  //Render the chatbot
  return (
    <>
      <Navbar currentStep={currentStep} />
      <div className="relative bg-white text-center rounded-xl shadow-lg pt-8 p-4 md:p-18">
        {showConfetti && <Confetti />}

        {/*Integration Fail Render*/}
        {integrationFailed ? (
          <div className="text-center space-y-6 h-screen flex flex-col justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Integration Failed!
            </h2>
            <p className="text-gray-600">
              We couldn't detect your integration. Please check your setup or
              try again.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => setIntegrationFailed(false)} // Reset state to try again
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
              <button
                onClick={toggleSidebar} // Open the sidebar to submit feedback
                className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700"
              >
                Provide Feedback
              </button>
            </div>
          </div>
        ) : activeTab === "success" ? (
          <div className="text-center space-y-6 h-screen flex flex-col justify-center">
            {/*Integration Fail Render*/}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Integration Successful!
            </h2>
            <p className="text-gray-600">
              Your chatbot is now ready to assist your customers.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
                Explore Admin Panel
              </button>
              <button
                onClick={handleOpenChatbot}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
              >
                Start Talking to Your Chatbot
              </button>
            </div>
            <div className="mt-6 space-x-4 flex justify-center">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
              >
                <Facebook className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://yourwebsite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500"
              >
                <Twitter className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://yourwebsite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800"
              >
                <CiLinkedin className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://wa.me/?text=Check%20out%20this%20chatbot%20integration%20https://yourwebsite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
              >
                <FaWhatsapp className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        ) : (
          <>
            {/*Chatbot Test*/}
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "test"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("test")}
              >
                Test Chatbot
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "integrate"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("integrate")}
              >
                Integration Guide
              </button>
            </div>
            {/*Render Dummy Website*/}
            {activeTab === "test" ? (
              <div className="space-y-6">
                <div className="relative border rounded-lg bg-gray-50 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 bg-white p-4 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Chrome className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-600">
                        Preview Mode
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        Dummy Website
                      </span>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>Report Issue</span>
                    </button>
                  </div>
                  <iframe
                    src="https://portfolio-eight-swart-49.vercel.app/"
                    title="Company Website"
                    width="100%"
                    height="500"
                    frameBorder="0"
                    style={{ border: "none", borderRadius: "8px" }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Add to your website</h3>
                  <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
                    {`<script src="https://cdn.chatbot.ai/widget.js"></script>
                      <script>
                        window.ChatbotAI.init({apiKey: 'your-api-key'}); 
                      </script>`}
                  </pre>
                </div>
                <button
                  onClick={sendEmailInstructions}
                  className="flex items-center justify-center space-x-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email Instructions to Developer</span>
                </button>
              </div>
            )}
          </>
        )}

        {!showConfetti && !integrationFailed && (
          <button
            onClick={handleTestSuccess}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Test Integration
          </button>
        )}

        {/* Floating Chatbot Icon */}
        <div
          onClick={handleOpenChatbot}
          className="fixed bottom-4 right-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg sm:w-20 sm:h-20"
        >
          <MessageSquare className="w-8 h-8 text-white sm:w-10 sm:h-10" />
        </div>

        {/* Floating Chatbot Simulation */}
        {chatbotVisible && (
          <div className="fixed bottom-4 right-4 w-72 h-96 bg-white border rounded-lg shadow-lg flex flex-col sm:w-80 sm:h-104">
            <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
              <span>Chatbot</span>
              <button onClick={handleCloseChatbot} className="text-white">
                &times;
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <p className="text-gray-600">Hello! How can I help you today?</p>
            </div>
            <div className="p-3 border-t">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-64 bg-gray-800 text-white transition-all transform ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4">
            Chatbot not working as intended?
          </h3>
          <p className="mb-4">Share feedback with us and we will assist you!</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            Submit Feedback
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg"
      >
        <ChevronRight
          className={`w-5 h-5 transform ${sidebarVisible ? "rotate-180" : ""}`}
        />
      </button>
    </>
  );
};

export default Integration;
