import React, { useEffect, useState } from 'react';

const Meals = () => {
  const [meals, setMeals] = useState([]); // For storing meals data
  const [searchTerm, setSearchTerm] = useState(''); // For tracking the search input
  const [selectedMeal, setSelectedMeal] = useState(null); // For showing details in an iframe

  // Fetch data when the search term changes
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setMeals(data.meals || []));
    }
  }, [searchTerm]);

  return (
    <div className="meals-container">
      {/* Search Bar */}
      <div className="search-bar bg-slate-300 p-4">
        <h2 className="text-center text-lg font-bold">Search for Meals</h2>
        <input
          type="text"
          placeholder="Search meals..."
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display Meals */}
      <div className="meals-list grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="meal-item border p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedMeal(meal)}
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-center mt-2 font-semibold">{meal.strMeal}</h3>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            {searchTerm
              ? 'No meals found. Try searching something else!'
              : 'Welcome! Start by searching for a meal.'}
          </p>
        )}
      </div>

      {/* Display Selected Meal Details */}
      {selectedMeal && (
        <div className="meal-details p-4">
          <h2 className="text-lg font-bold text-center mb-4">
            {selectedMeal.strMeal}
          </h2>
          <iframe
            title="Meal Instructions"
            src={selectedMeal.strYoutube.replace('watch?v=', 'embed/')}
            className="w-full h-64 rounded"
          />
          <p className="mt-4">{selectedMeal.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default Meals;
