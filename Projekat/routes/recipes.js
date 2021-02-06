const express = require('express')
const recipes = require('../models/Recipes');

const router = express.Router();

router.get('/', function (req, res) {
    res.render('recipes', { title: 'BestRecipesWarld', heading: 'Enjoy our best recipes!', recipes: recipes })
  });

router.get('/add', function (req, res) {
    const found = recipes.find(recipe => recipe.name === req.params.name);
    if (found) {
        res.render('recipe', { title: 'BestRecipesWarld', heading: req.params.name, recipe: found })
    } else {
        res.status(400).json({ msg: `No recipe with name: ${req.params.name}`});
    }
  });

router.get('/:name', function (req, res) {
    const found = recipes.find(recipe => recipe.name === req.params.name);
    if (found) {
        res.render('recipe', { title: 'BestRecipesWarld', heading: req.params.name, recipe: found })
    } else {
        res.status(400).json({ msg: `No recipe with name: ${req.params.name}`});
    }
  });

router.post('/', function(req, res) {
    const newrecipe = {
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        prep: req.body.prep,
        cook: req.body.cook,
        total: req.body.total,
        servings: req.body.servings,
        steps: req.body.steps
    }

    if (!newrecipe.name || !newrecipe.description || !newrecipe.ingredients || !newrecipe.prep || !newrecipe.cook || !newrecipe.total || !newrecipe.servings || !newrecipe.steps) {
        res.status(400).json({ msg: 'Please include all information'});
        return;
    }

    recipes.push(newrecipe)

    res.json(recipes)
  });

router.put('/:name', function (req, res) {
    const found = recipes.some(recipe => recipe.name === req.params.name);
    if (found) {
        const updrecipes = req.body;
        recipes.forEach(recipe => {
            if(recipe.name === req.params.name) {
                recipe.name = updrecipes.name ? updrecipes.name : recipe.name;
                recipe.description = updrecipes.description ? updrecipes.description : recipe.description;
                recipe.ingedients = updrecipes.ingedients ? updrecipes.ingedients : recipe.ingedients;
                recipe.prep = updrecipes.prep ? updrecipes.prep : recipe.prep;
                recipe.cook = updrecipes.cook ? updrecipes.cook : recipe.cook;
                recipe.total = updrecipes.total ? updrecipes.total : recipe.total;
                recipe.servings = updrecipes.servings ? updrecipes.servings : recipe.servings;
                recipe.steps = updrecipes.steps ? updrecipes.steps : recipe.steps;

                res.json({ msg: 'Recipe updated!', recipe})
            }
        })
    } else {
        res.status(400).json({ msg: `No recipes with name: ${req.params.name}`});
    }
  });

router.delete('/:name', function (req, res) {
    const found = recipes.find(recipe => recipe.name === req.params.name);
    if (found) {
        const index = recipes.indexOf(found);
        recipes.splice(index, 1);
        res.redirect('recipes')
    } else {
        res.status(400).json({ msg: `No recipe with name: ${req.params.name}`});
    }
  });

module.exports = router;