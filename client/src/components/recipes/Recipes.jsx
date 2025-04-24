import React, { useState, useEffect } from "react";
import "./Recipes.css";

function Recipes() {
  // State variables for user input
  const [difficulty, setDifficulty] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [caloriesPerServing, setCaloriesPerServing] = useState("");
  const [mealType, setMealType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State variable to store fetched recipes
  const [recipes, setRecipes] = useState([]);

  // Function to fetch all recipes (as defined above)
  const fetchAllRecipes = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/products/recipes/all"
      ); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Adjust this based on the actual data structure
      console.log("Fetched all recipes:", data);
      setRecipes(data.payload); // Adjust based on the actual data structure
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchAllRecipes(); // Fetch all recipes on component mount
  }, []);

  const fetchRecipes = async (filters) => {
    setIsLoading(true); // Set loading state while fetching
    try {
      const response = await fetch(
        "http://localhost:4000/products/recipes/search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data in fetch per filter:", data);
      return data.payload || []; // Ensure to return the correct part of the response
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    } finally {
      setIsLoading(false); // Reset loading state after fetching
    }
  };

  const handleFilterRecipes = async () => {
    const filters = {
      difficulty: difficulty || undefined, // Use optional chaining for undefined values
      cuisine: cuisine || undefined,
      caloriesPerServing: !isNaN(caloriesPerServing)
        ? parseInt(caloriesPerServing, 10)
        : undefined,
      mealType: mealType || undefined,
    };

    try {
      const fetchedRecipes = await fetchRecipes(filters);
      setRecipes(fetchedRecipes);
      console.log("Fetched recipes with filters:", fetchedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4 text-primary">Recipe Filter</h2>
      <form className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="difficulty" className="form-label">
            Difficulty:
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="form-select"
          >
            <option value="">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div
          className="col-md-4 mb-3"
        >
          <label htmlFor="cuisine" className="form-label">
            Cuisine:
          </label>
          <input
            type="text"
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="form-control"
            placeholder="Search by cuisine"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="caloriesPerServing" className="form-label">
            Calories per Serving:
          </label>
          <input
            type="number"
            id="caloriesPerServing"
            value={caloriesPerServing}
            onChange={(e) => setCaloriesPerServing(e.target.value)}
            className="form-control"
            placeholder="Max calories"
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="mealType" className="form-label">
            Meal Type:
          </label>
          <select
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="form-select"
          >
            <option value="">Any</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>{" "}
           
        </div>
        <div className="col-12 mt-3 text-center">
          <button
            type="button"
            onClick={handleFilterRecipes}
            className="btn btn-primary"
          >
            Filter Recipes
          </button>
        </div>
      </form>

      <h1 className="display-4 text-center text-primary my-4">Recipes</h1>

      <div className="container">
        <div className="row">
          {recipes.length > 0 ? (
            
            recipes.map((recipe) => (
              
              <div key={recipe.id} className="col-md-4 mb-3">
                
                <div className="card">
                  <img
                    src={recipe.image}
                    className="card-img-top"
                    alt={recipe.name}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{recipe.name}</h3>
                    <p className="card-text">{recipe.description}</p>
                    <div
                      className="d-flex   
       flex-wrap justify-content-between mt-2"
                    >
                      <div className="d-flex flex-wrap gap-2">
                        {recipe.tags.map((tag) => (
                          <span
                            key={tag}
                            className="badge rounded-pill bg-primary text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center fs-4">
              <p className="lead">No recipes found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
