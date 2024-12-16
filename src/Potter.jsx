import React, { useEffect, useState } from "react";

const Potter = () => {
  const [data, setData] = useState([]); 
  const [endpoint, setEndpoint] = useState("characters"); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const BASE_URL = "https://potterapi-fedeperin.vercel.app/en"; 

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
  }, [endpoint]); 

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-500 animate-bounce">
        🧙‍♂️ Harry Potter API Explorer
        </h1>

        <div className="flex justify-center mb-8">
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

        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400"></div>
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 mt-6 text-lg font-semibold">
            ⚠️ Error: {error}
          </p>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400 text-center uppercase">
            {endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.length > 0 &&
              data.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name || "Unnamed"}
                      className="w-full h-auto object-cover rounded-lg mb-4"
                    />
                  )}

                  {endpoint === "books" && (
                    <>
                      {item.title && (
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Title: {item.title}
                        </h3>
                      )}
                      {item.originalTitle && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Original Title:</span> {item.originalTitle}
                        </p>
                      )}
                      {item.releaseDate && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Release Date:</span> {item.releaseDate}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-gray-200 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Description:</span> {item.description}
                        </p>
                      )}
                      {item.pages && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Pages:</span> {item.pages}
                        </p>
                      )}
                      {item.cover && (
                        <img
                          src={item.cover}
                          alt={item.title || "Book Cover"}
                          className="w-full h-auto object-contain rounded-lg mb-4"
                        />
                      )}
                    </>
                  )}

                  {endpoint === "characters" && (
                    <>
                      {item.nickname && (
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Name: {item.nickname}
                        </h3>
                      )}
                      {item.hogwartsHouse && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Hogwarts House:</span> {item.hogwartsHouse}
                        </p>
                      )}
                      {item.birthdate && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Birthdate:</span> {item.birthdate}
                        </p>
                      )}
                      {item.interpretedBy && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Interpreted By:</span> {item.interpretedBy}
                        </p>
                      )}
                    </>
                  )}

                  {endpoint === "houses" && (
                    <>
                      {item.house && (
                        <h3 className="text-xl font-semibold text-white mb-2">
                          House: {item.house}
                        </h3>
                      )}
                      {item.emoji && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">symbol</span> {item.emoji}
                        </p>
                      )}
                      {item.founder && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Founder:</span> {item.founder}
                        </p>
                      )}
                      {item.animal && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">animal:</span> {item.animal}
                        </p>
                      )}
                      {item.colors && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Colors:</span> {item.colors.join(', ')}
                        </p>
                      )}
                    </>
                  )}
                  {endpoint === "spells" &&
                    <>
                      {item.spell && (
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Spell: {item.spell}
                        </h3>
                      )}
                      {item.use && (
                        <p className="text-gray-300 text-sm mt-2">
                          <span className="font-bold text-yellow-400">Usage:</span> {item.use}
                        </p>
                      )}
                    </>
                  }
                </div>
              ))}
          </div>

          {!loading && data.length === 0 && (
            <p className="text-center text-gray-400 mt-6">
              No data available for the selected category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Potter;