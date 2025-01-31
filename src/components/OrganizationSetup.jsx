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
import { useNavigate } from "react-router-dom";

//OrganizationSetup Component
const OrganizationSetup = ({ onComplete }) => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [error, setError] = useState("");
  const [selectedPage, setSelectedPage] = useState(null);

  //Scraped dummy data
  const [pages, setPages] = useState([
    {
      url: "/home",
      status: "scraped",
      dataChunks: ["Welcome section", "Latest news"],
    },
    { url: "/about", status: "pending", dataChunks: [] },
    { url: "/contact", status: "failed", dataChunks: [] },
    {
      url: "/products",
      status: "scraped",
      dataChunks: ["Product list", "Pricing"],
    },
  ]);

  //Function to fetch company description from the compnay website url
  const handleFetchDescription = async () => {
    if (!companyUrl) return;

    try {
      const apiId = "2442f3f9-9db4-453c-b89a-bc6ca39bd2e0";
      const url = `https://opengraph.io/api/1.1/site/${encodeURIComponent(
        companyUrl
      )}?app_id=${apiId}`;
      const response = await fetch(url);

      const data = await response.json();
      if (data.hybridGraph?.description) {
        setCompanyDescription(data.hybridGraph.description);
      } else {
        setCompanyDescription(
          "No description found for the website. please add your Description"
        );
      }
    } catch (error) {
      setError("Failed to fetch meta description.");
    }
  };

  //Form submit and to navigate to Integration page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName || !companyUrl)
      return setError("Please fill in all fields.");

    const companyData = {
      companyName,
      companyUrl,
      companyDescription,
    };
    window.scrollTo(0, 0);
    navigate("/integration", { state: companyData });
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

  //Render
  return (
    <>
      <Navbar currentStep={2} />
      <div className="flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full sm:w-3/4 md:w-1/2 max-w-4xl">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Set up your organization
          </h2>
          {/*Form to fill in company name, URL, description*/}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/*Name Field*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Acme Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/*Website URL Field*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  required
                />
              </div>
              {companyUrl.length !== 0 && (
                <button
                  type="button"
                  onClick={handleFetchDescription}
                  className="mt-4 text-blue-600 font-semibold border border-blue-600 rounded-lg px-4 py-2 hover:bg-blue-600 hover:text-white"
                >
                  Fetch Description
                </button>
              )}
            </div>

            {/*Website Description Field*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Tell us about your organization..."
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              />
            </div>

            {/*Dummy Scraped Pages Rendering*/}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Detected Pages
              </h3>
              <div className="space-y-2">
                {pages.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedPage(page)}
                  >
                    <span className="text-gray-700">{page.url}</span>
                    {getStatusIcon(page.status)}
                  </div>
                ))}
              </div>
            </div>

            {/*Pages specifc details rendering*/}
            {selectedPage && (
              <div className="border-2 border-gray-300 rounded-lg p-4 mt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Scraped Data for {selectedPage.url}
                </h3>
                <ul className="list-disc pl-6">
                  {selectedPage.dataChunks.length > 0 ? (
                    selectedPage.dataChunks.map((chunk, i) => (
                      <li key={i}>{chunk}</li>
                    ))
                  ) : (
                    <li>No data chunks found</li>
                  )}
                </ul>
              </div>
            )}
            {/*Errors Rendering after form submission*/}
            {error !== 0 && <p>{error}</p>}

            {/*Form submission button*/}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <span>Continue to Integration</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrganizationSetup;
