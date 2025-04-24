// import React, { useState, useEffect } from 'react';
// import { useCopilotAction } from "@copilotkit/react-core";

// function RecipeRecommender() {
//   // State variables for user input
//   const [difficulty, setDifficulty] = useState('');
//   const [cuisine, setCuisine] = useState('');
//   const [caloriesPerServing, setCaloriesPerServing] = useState(0);
//   const [mealType, setMealType] = useState('');

//   // Function to fetch recipes based on user input
//   const fetchRecipes = async (filters) => {
//     const response = await fetch('http://localhost:4000/products/recipes/search', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(filters),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     return data.recipes; // Assuming API returns recipes in 'recipes' property
//   };

//   // Copilot action to recommend recipes
//   const recommendRecipesAction = useCopilotAction({
//     name: "recommendRecipes",
//     description: "Recommend recipes based on your preferences",
//     parameters: [
//       { name: "difficulty", type: "string", description: "Recipe difficulty" },
//       { name: "cuisine", type: "string", description: "Cuisine type" },
//       { name: "caloriesPerServing", type: "number", description: "Calories per serving" },
//       { name: "mealType", type: "string", description: "Meal type" },
//     ],
//     handler: async ({ difficulty, cuisine, caloriesPerServing, mealType })=> {
//       const filters = {
//         difficulty,
//         cuisine,
//         caloriesPerServing,
//         mealType,
//       };

//       try {
//         const recipes = await fetchRecipes(filters);
//         console.log(recipes); // Replace with logic to display or utilize recipes

//         // You can use state management or directly render the recipes here
//         // For example, setRecipes(recipes) to store recipes in state
//         // or renderRecipes(recipes) to display them in the UI
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         // Handle errors gracefully, e.g., show an error message to the user
//       }
//     },
//   });

//   return (
//     <div>
//       <h2>Recipe Recommender</h2>
//       <form>
//         <label htmlFor="difficulty">Difficulty:</label>
//         <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
//           <option   
//  value="">Any</option>
//           <option value="easy">Easy</option>
//           <option value="medium">Medium</option>
//           <option value="hard">Hard</option>
//         </select>

//         <label htmlFor="cuisine">Cuisine:</label>   

//         <input type="text" id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />

//         <label htmlFor="caloriesPerServing">Calories per Serving:</label>
//         <input type="number" id="caloriesPerServing" value={caloriesPerServing} onChange={(e) => setCaloriesPerServing(e.target.value)} />

//         <label htmlFor="mealType">Meal Type:</label>
//         <select id="mealType" value={mealType} onChange={(e) => setMealType(e.target.value)}>
//           <option value="">Any</option>
//           <option value="breakfast">Breakfast</option>
//           <option value="lunch">Lunch</option>
//           <option value="dinner">Dinner</option>
//           <option value="snack">Snack</option>
//         </select>   


//         <button type="button" onClick={() => recommendRecipesAction.handler({ difficulty, cuisine, caloriesPerServing, mealType })}>
//         Recommend Recipes
//       </button>
//       </form>
//     </div>
//   );
// }

// export default RecipeRecommender;


function RecipeRecommender() {
  // State variables for user input
  const [difficulty, setDifficulty] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [caloriesPerServing, setCaloriesPerServing] = useState(0);
  const [mealType, setMealType] = useState('');

  // State variable to store fetched recipes (optional)
  const [recipes, setRecipes] = useState([]);

  // Function to fetch recipes based on user input
  const fetchRecipes = async (filters) => {
    const response = await fetch('http://localhost:4000/products/recipes/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return data.recipes; // Assuming API returns recipes in 'recipes' property
  };

  useCopilotReadable({
    description: 'Recommended recipes',
    value: recipes,
  });

  // Copilot action to recommend recipes
  const recommendRecipesAction = useCopilotAction({
    name: "recommendRecipes",
    description: "Recommend recipes based on your preferences",
    parameters: [
      { name: "difficulty", type: "string", description: "Recipe difficulty" },
      { name: "cuisine", type: "string", description: "Cuisine type" },
      { name: "caloriesPerServing", type: "number", description: "Calories per serving" },
      { name: "mealType", type: "string", description: "Meal type" },
    ],
    handler: async ({ difficulty, cuisine, caloriesPerServing, mealType }) => {
      const filters = {
        difficulty,
        cuisine,
        caloriesPerServing,
        mealType,
      };

      try {
        const fetchedRecipes = await fetchRecipes(filters);
        setRecipes(fetchedRecipes); // Update state with fetched recipes
        console.log(recipes); // Optional logging for debugging

        // You can now use the `recipes` state variable to display or utilize them further
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Handle errors gracefully, e.g., show an error message to the user
      }
    },
  });

  console.log(recommendRecipesAction);

  return (
    <div>
      <h2>Recipe Recommender</h2>
      <form>
        <label htmlFor="difficulty">Difficulty:</label>
        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
  
        <label htmlFor="cuisine">Cuisine:</label>
        <input type="text" id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
  
        <label htmlFor="caloriesPerServing">Calories per Serving:</label>
        <input type="number" id="caloriesPerServing" value={caloriesPerServing} onChange={(e) => setCaloriesPerServing(e.target.value)} />
  
        <label htmlFor="mealType">Meal Type:</label>
        <select id="mealType" value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="">Any</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        

        <button type="button" onClick={() => recommendRecipesAction.handler({ difficulty, cuisine, caloriesPerServing, mealType })}>
          Recommend Recipes
        </button>
      </form>
  
      {/* Display fetched recipes (optional) */}
      {recipes.length > 0 && (
        <div>
          <h3>Recommended Recipes</h3>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                {/* Display recipe name, with additional information if available */}
                {recipe.name}
                {recipe.imageUrl && (
                  <img src={recipe.imageUrl} alt={recipe.name} width="100" />
                )}
                {recipe.description && <p>{recipe.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  }
  
  export default RecipeRecommender;