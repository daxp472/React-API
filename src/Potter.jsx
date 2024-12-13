import React, { useEffect, useState } from "react";

const Potter = () => {
  const [data, setData] = useState([]); // To store fetched data
  const [endpoint, setEndpoint] = useState("characters"); // Default endpoint
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const BASE_URL = "https://potterapi-fedeperin.vercel.app/en"; // API Base URL

  // Fetch data from the selected endpoint
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]); // Re-fetch data when the endpoint changes

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-500 animate-bounce">
          🧙‍♂️ Harry Potter API Explorer
        </h1>

        {/* Dropdown Selector */}
        <div className="flex justify-center mb-6">
          <select
            className="p-3 rounded-lg bg-gray-800 text-yellow-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          >
            <option value="books">Books</option>
            <option value="characters">Characters</option>
            <option value="houses">Houses</option>
            <option value="spells">Spells</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <p className="text-center text-red-500 mt-4 text-lg">
            ⚠️ Error: {error}
          </p>
        )}

        {/* Display Data */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400 text-center uppercase">
            {endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.length > 0 &&
              data.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  {/* Dynamic Content */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name || "Unnamed"}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                    {item.name || item.title || "Unnamed"}
                  </h3>
                  {item.house && (
                    <p className="text-gray-500 text-sm">
                      <span className="font-bold text-yellow-400">House:</span>{" "}
                      {item.house}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-gray-400 text-sm mt-2">
                      {item.description.slice(0, 100)}...
                    </p>
                  )}
                  {item.author && (
                    <p className="text-gray-500 text-sm mt-2">
                      <span className="font-bold text-yellow-400">Author:</span>{" "}
                      {item.author}
                    </p>
                  )}
                  {item.school && (
                    <p className="text-gray-500 text-sm mt-2">
                      <span className="font-bold text-yellow-400">School:</span>{" "}
                      {item.school}
                    </p>
                  )}
                </div>
              ))}
          </div>

          {!loading && data.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              No data available for the selected category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Potter;
