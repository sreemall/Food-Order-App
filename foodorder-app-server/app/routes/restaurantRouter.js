const express = require ("express");
const { getAllRestaurants, getRestaurant, createRestaurant, editRestaurant, deleteRestaurant } = require ("../controllers/restaurantController");

const restaurantRouter = express.Router();

restaurantRouter.route ("/").get (getAllRestaurants)
                            .post (createRestaurant);

restaurantRouter.route ("/:id").get (getRestaurant)
                            .put (editRestaurant)
                            .delete (deleteRestaurant);

module.exports = restaurantRouter;