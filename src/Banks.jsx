import React, { useState } from "react";

const Bank = () => {
  const [ifsc, setIfsc] = useState("");
  const [bankDetails, setBankDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBankDetails = () => {
    if (!ifsc) {
      setError("Please enter a valid IFSC code.");
      return;
    }

    setError("");
    setLoading(true);

    fetch(`https://bank-apis.justinclicks.com/API/V1/IFSC/${ifsc.toUpperCase()}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bank details. Please check the IFSC code.");
        }
        return response.json();
      })
      .then((data) => {
        setBankDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setBankDetails(null);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white font-sans">
      <div className="max-w-xl w-full bg-white bg-opacity-10 p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center mb-6 text-white tracking-wider">
          🏦 Bank Details Finder
        </h1>
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
            placeholder="Enter IFSC Code"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent mb-4 transition duration-300"
          />
          <button
            onClick={fetchBankDetails}
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
          >
            Get Bank Details
          </button>
        </div>

        {loading && (
          <p className="text-center mt-6 text-white animate-pulse">
            🔄 Fetching bank details...
          </p>
        )}

        {error && (
          <p className="text-center mt-6 text-red-400 font-semibold">{error}</p>
        )}

        {bankDetails && (
          <div className="mt-6 p-4 bg-gray-900 bg-opacity-50 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
            <h2 className="text-xl font-bold mb-4 text-white text-center">
              🏦 Bank Details
            </h2>
            <ul className="space-y-2 text-gray-200">
              <li>
                <span className="font-semibold">Bank:</span> {bankDetails.BANK}
              </li>
              <li>
                <span className="font-semibold">Branch:</span> {bankDetails.BRANCH}
              </li>
              <li>
                <span className="font-semibold">Address:</span> {bankDetails.ADDRESS}
              </li>
              <li>
                <span className="font-semibold">City:</span> {bankDetails.CITY}
              </li>
              <li>
                <span className="font-semibold">State:</span> {bankDetails.STATE}
              </li>
              <li>
                <span className="font-semibold">Contact:</span> {bankDetails.CONTACT}
              </li>
              <li>
                <span className="font-semibold">IFSC:</span> {bankDetails.IFSC}
              </li>
              <li>
                <span className="font-semibold">MICR:</span> {bankDetails.MICR || "N/A"}
              </li>
              <li>
                <span className="font-semibold">IMPS:</span>{" "}
                {bankDetails.IMPS ? "Yes" : "No"}
              </li>
              <li>
                <span className="font-semibold">NEFT:</span>{" "}
                {bankDetails.NEFT ? "Yes" : "No"}
              </li>
              <li>
                <span className="font-semibold">RTGS:</span>{" "}
                {bankDetails.RTGS ? "Yes" : "No"}
              </li>
              <li>
                <span className="font-semibold">UPI:</span>{" "}
                {bankDetails.UPI ? "Yes" : "No"}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bank;
