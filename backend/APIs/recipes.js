const express = require("express");
const { Db } = require("mongodb");
const recipes = express.Router();
const expressAsyncHandler = require("express-async-handler");

recipes.use(express.json());

recipes.post('/search', expressAsyncHandler(async (req, res) => {
    console.log("Request body received:", req.body);
  
    const { difficulty, cuisine, caloriesPerServing, mealType } = req.body;
  
    const recipesCollection = req.app.get('recipesCollection');
  
    // Initialize an empty filters object
    const filters = {};
  
    // Add filters based on provided criteria with capitalized first letters
    if (difficulty) {
      filters.difficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }
  
    if (cuisine) {
      filters.cuisine = cuisine;
    }
  
    if (caloriesPerServing && !isNaN(caloriesPerServing)) {
      filters.caloriesPerServing = { $lte: parseInt(caloriesPerServing, 10) };
    }
  
    if (mealType) {
      filters.mealType = { $in: [mealType.charAt(0).toUpperCase() + mealType.slice(1)] };
    }
  
    console.log("Constructed filters:", filters);
  
    try {
      // Fetch recipes from database
      let recipesData = await recipesCollection.find(filters).toArray();
  
      // Filter recipes based on criteria
      const filteredRecipes = recipesData.filter(recipe => {
        let matches = true;
        if (filters.difficulty && recipe.difficulty !== filters.difficulty) matches = false;
        if (filters.cuisine && recipe.cuisine !== filters.cuisine) matches = false;
        // if (filters.caloriesPerServing && recipe.caloriesPerServing > filters.caloriesPerServing) matches = false;
        // if (filters.mealType && recipe.mealType.indexOf(filters.mealType) === -1) matches = false;
        return matches;
      });
  
      console.log("Filtered recipes:", filteredRecipes);
  
      // Send the response with the filtered recipes
      res.send({ message: "Recipes as per filters:", payload: filteredRecipes });
    } catch (error) {
      // Log the error details
      console.error("Error filtering recipes:", error);
  
      // Send an error response with the error message
      res.status(500).json({ message: "An error occurred while fetching recipes.", error: error.message });
    }
  }));


recipes.get("/all", expressAsyncHandler(async (req, res) => {
    const recipesCollection = req.app.get('recipesCollection');
    try {
        let prodList = await recipesCollection.find().toArray();
        res.json({ message: "All recipes:", payload: prodList });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching all recipes.", error: error.message });
    }
}));

module.exports = recipes;