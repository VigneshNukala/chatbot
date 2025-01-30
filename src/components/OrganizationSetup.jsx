import React, { useState } from "react";
import {
  Building2,
  Globe,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Navbar from "./Navbar";
const OrganizationSetup = ({ onComplete }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [error, setError] = useState("");

  const [pages, setPages] = useState([
    { url: "/home", status: "scraped" },
    { url: "/about", status: "pending" },
    { url: "/contact", status: "failed" },
    { url: "/products", status: "scraped" },
  ]);

  const handleFetchDescription = async () => {
    if (!companyUrl) return;

    try {
      const response = await fetch(
        `https://api.metadefender.com/url?url=${companyUrl}`
      );
      const data = await response.json();
      console.log(data);
      if (data && data.metaDescription) {
        setCompanyDescription(data.metaDescription);
      } else {
        setCompanyDescription("No description found for the website.");
      }
    } catch (error) {
      setError("Failed to fetch meta description.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onComplete(formData);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "scraped":
        return <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500 animate-pulse" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Set up your organization
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Acme Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://example.com"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  required
                />
              </div>
              <button onClick={handleFetchDescription}>Fetch Description</button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                rows={3}
                placeholder="Tell us about your organization..."
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
          
              />
            </div>

            {/* Detected Pages */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Detected Pages
              </h3>
              <div className="space-y-2">
                {pages.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-200 transform hover:scale-105"
                  >
                    <span className="text-gray-700">{page.url}</span>
                    {getStatusIcon(page.status)}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <span>Continue to Integration</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrganizationSetup;
