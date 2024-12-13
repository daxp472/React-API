import React, { useEffect, useState } from "react";

const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]); // Cocktail list
  const [search, setSearch] = useState(""); // Search query
  const [filterType, setFilterType] = useState("name"); // Filter type (name, first letter, etc.)
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data based on filter type
  const fetchCocktails = async () => {
    setLoading(true);
    setError(null);
    let url = "";

    try {
      switch (filterType) {
        case "name":
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
          break;
        case "firstLetter":
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
          break;
        case "random":
          url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
          break;
        case "category":
          url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${search}`;
          break;
        case "ingredient":
          url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
          break;
        case "alcoholic":
          url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${search}`;
          break;
        default:
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.drinks) {
        setCocktails(data.drinks);
      } else {
        setCocktails([]);
      }
    } catch (err) {
      setError("Failed to fetch cocktails. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on search or filter type change
  useEffect(() => {
    if (search || filterType === "random") {
      fetchCocktails();
    }
  }, [search, filterType]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Cocktails Explorer
      </h2>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a cocktail..."
            className="p-2 border rounded w-full max-w-md focus:ring focus:ring-blue-300"
            disabled={filterType === "random"}
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border rounded focus:ring focus:ring-blue-300"
          >
            <option value="name">Search by Name</option>
            <option value="firstLetter">Search by First Letter</option>
            <option value="random">Random Cocktail</option>
            <option value="category">Filter by Category</option>
            <option value="ingredient">Filter by Ingredient</option>
            <option value="alcoholic">Filter by Alcoholic/Non-Alcoholic</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* Cocktail List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cocktails.length > 0 ? (
          cocktails.map((cocktail) => (
            <div
              key={cocktail.idDrink}
              className="p-4 border rounded shadow-md bg-white hover:shadow-lg transition duration-300"
            >
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">
                {cocktail.strDrink}
              </h3>
              <p className="text-sm text-gray-600">
                {cocktail.strCategory || "Unknown Category"}
              </p>
              <p className="text-sm text-gray-600">
                {cocktail.strAlcoholic || "Unknown Type"}
              </p>
              <button
                className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                onClick={() =>
                  alert(
                    `Ingredients: ${cocktail.strIngredient1}, ${cocktail.strIngredient2}, ...`
                  )
                }
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center text-gray-500 col-span-full">
              No cocktails found.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Cocktails;
