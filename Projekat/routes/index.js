const express = require("express");
const recipes = require("../models/Recipes");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", {
    title: "BestRecipesWarld",
    heading: "Enjoy our best recipes!",
  });
});

module.exports = router;
