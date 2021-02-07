const express = require("express");
let recipes = require("../models/Recipes");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("recipes", {
    title: "Best Recipes in the World",
    heading: "Enjoy our best recipes!",
    recipes,
  });
});

router.get("/add", function (req, res) {
  res.render("recipe", {
    title: "Add new recipe",
    heading: req.params.name,
    recipe: null,
  });
});

router.get("/:id", function (req, res) {
  const { id } = req.params;
  const found = recipes.indexOf((recipe) => recipe.id === id);
  if (found) {
    res.render("recipe", {
      title: "BestRecipesWarld",
      heading: req.params.name,
      recipe: recipes[id],
    });
  } else {
    res.status(400).json({ msg: `No recipe with id: ${req.params.id}` });
  }
});

router.post("/", function (req, res) {
  const newRecipe = {
    ...req.body,
    id: recipes.length,
    total: Number.parseInt(req.body.prep) + Number.parseInt(req.body.cook),
  };

  recipes.push(newRecipe);
  res.redirect("recipes");
});

router.post("/edit/:id", function (req, res) {
  const { id } = req.params;
  const updatedRecipe = { ...req.body, id };

  const found = recipes.indexOf((recipe) => recipe.id === id);
  if (found) {
    recipes[id] = { ...updatedRecipe };
    console.log("recipes", recipes);
    res.redirect("/recipes");
  } else {
    res.status(400).json({ msg: `No recipes with the given id: ${id}` });
  }
});

// router.put("/:name", function (req, res) {
//   const found = recipes.some((recipe) => recipe.name === req.params.name);
//   if (found) {
//     const updrecipes = req.body;
//     recipes.forEach((recipe) => {
//       if (recipe.name === req.params.name) {
//         recipe.name = updrecipes.name ? updrecipes.name : recipe.name;
//         recipe.description = updrecipes.description
//           ? updrecipes.description
//           : recipe.description;
//         recipe.ingedients = updrecipes.ingedients
//           ? updrecipes.ingedients
//           : recipe.ingedients;
//         recipe.prep = updrecipes.prep ? updrecipes.prep : recipe.prep;
//         recipe.cook = updrecipes.cook ? updrecipes.cook : recipe.cook;
//         recipe.total = updrecipes.total ? updrecipes.total : recipe.total;
//         recipe.servings = updrecipes.servings
//           ? updrecipes.servings
//           : recipe.servings;
//         recipe.steps = updrecipes.steps ? updrecipes.steps : recipe.steps;

//         res.json({ msg: "Recipe updated!", recipe });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No recipes with name: ${req.params.name}` });
//   }
// });

router.delete("/:id", function (req, res) {
  const id = Number.parseInt(req.params.id);
  recipes = recipes.filter((recipe) => recipe.id !== id);
  res.redirect("/recipes");
});

module.exports = router;
