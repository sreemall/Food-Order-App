const express = require ("express");
const { getAllCuisines, getCuisine, createCuisine, editCuisine, deleteCuisine } = require("../controllers/cuisineController");

const cuisineRouter = express.Router ();

cuisineRouter.route ("/").get (getAllCuisines)
                        .post (createCuisine);

cuisineRouter.route ("/:id").get (getCuisine)
                        .put (editCuisine)
                        .delete (deleteCuisine);

module.exports = cuisineRouter;