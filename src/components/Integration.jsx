import React, { useState } from 'react';
import { Chrome, AlertCircle, Mail, Check, Share2 } from 'lucide-react';
import Confetti from './Confetti';

const Integration = () => {
  const [activeTab, setActiveTab] = useState('test');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleTestSuccess = () => {
    setShowConfetti(true);
    setActiveTab('success');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {showConfetti && <Confetti />}

      {activeTab === 'success' ? (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Integration Successful!</h2>
          <p className="text-gray-600">Your chatbot is now ready to assist your customers</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
              <h3 className="font-semibold mb-2">Explore Admin Panel</h3>
              <p className="text-sm text-gray-600">Configure and manage your chatbot</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
              <h3 className="font-semibold mb-2">Start Talking</h3>
              <p className="text-sm text-gray-600">Test your chatbot live</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
              <h3 className="font-semibold mb-2">Share</h3>
              <Share2 className="w-5 h-5 mx-auto mt-2 text-gray-600" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'test'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('test')}
            >
              Test Chatbot
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'integrate'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('integrate')}
            >
              Integration Guide
            </button>
          </div>

          {activeTab === 'test' ? (
            <div className="space-y-6">
              <div className="relative border rounded-lg h-96 bg-gray-50">
                <div className="absolute top-0 left-0 right-0 bg-white p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Chrome className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Preview Mode</span>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>Report Issue</span>
                  </button>
                </div>
                <div className="absolute bottom-4 right-4 w-72 h-96 bg-white rounded-lg shadow-lg border">
                  {/* Chatbot UI simulation */}
                </div>
              </div>
              <button
                onClick={handleTestSuccess}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Test Integration
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Add to your website</h3>
                <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
                  {`<script src="https://cdn.chatbot.ai/widget.js"></script>
<script>
  window.ChatbotAI.init({
    apiKey: 'your-api-key'
  });
</script>`}
                </pre>
              </div>
              <button className="flex items-center justify-center space-x-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200">
                <Mail className="w-5 h-5" />
                <span>Email Instructions to Developer</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Integration;