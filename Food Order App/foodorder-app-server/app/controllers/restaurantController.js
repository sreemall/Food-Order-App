const Restaurants = require ("../models/restaurantModel");

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurants.find ({isActive: true});

        res.status(200).json({
            data: restaurants,
            message: "Successfully fetched all restaurants.",
          });
    }
    catch (error) {
        console.error(error);
        res.status (500).json ({
                    message: "Error fetching restaurants",
                    error: error.message
        });
    }
}

const getRestaurant = async (req, res) => {
    try {
        const restaurantID = req.params.id;

        const restaurant = await Restaurants.find ({_id: restaurantID, isActive: true});
        res.status(200).json ({
            status: "success",
            data: restaurant
        });
    }
    catch (error) {
        console.error(error);
        res.status (500).json ({
                    message: "Error while fetching restaurant",
                    error: error.message
        });
    }
}

const createRestaurant = async (req, res) => 
{
    try {
        const newRestaurant = await Restaurants.create ({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        });
        if (!newRestaurant) {
            res.status(400);
            throw new Error(`Restaurant create failed.`);
        }
        else {
            const result = await newRestaurant.save ();
            if (result) {
                res.status(200).json({
                  message: `Restaurant is successfully created ${req.body.name}`,
                });
              } else {
                res.status(400);
                throw new Error(`Restaurant create failed`);
              }
        } 
    }
    catch (error) {
        console.error(error);
        res.status (500).json ({
                    message: "Error while Creating Restaurant",
                    error: error.message
        });
    }
}

const editRestaurant = async (req, res) => {
    try {
        const resturantID = req.params.id;
        const category = await Restaurants.findOne ({_id: resturantID, isActive: true});
        if (!restaurant) {
            res.status(400);
            throw new Error(`Restaurant Edit failed since restaurant with id: ${resturantID} not found`);
        }
        else {
            restaurant.name = req.body.name;
            restaurant.description = req.body.description;
            restaurant.image = req.body.image;

            const updatedRestaurant = await restaurant.save ();
            if (updatedCaurant) {
                res.status(200).json({
                  message: `Restaurant is successfully edited ${req.body.name}|${req.body.id}`,
                });
              } else {
                res.status(400);
                throw new Error(`Restaurant editing failed`);
              }
        }
    }
    catch (error) {
        res.status (500).json ({
            message: "Error while updating restaurant",
            error: error.message
        });
    }
}

const deleteRestaurant = async (req, res) => {
    try {
        const restaurantID = req.params.id;
        const restaurant = await Restaurants.findOne ({_id: restaurantID, isActive: true});
        if (!restaurant) {
            res.status(400);
            throw new Error(`Restaurant Delete failed since category with id: ${restaurantID} not found`);
        }
        else {
            restaurant.isActive = false;
            const updatedReestaurant = await restaurant.save ();
            if (updatedCaurant) {
                res.status(200).json({
                  message: `Restaurant is successfully deleted`,
                });
              } else {
                res.status(400);
                throw new Error(`Restaurant delete failed`);
              }
        }
    }
    catch (error) {
        res.status (500).json ({
            message: "Error while delete restaurant",
            error: error.message
        });
        // throw new Error (`Error while delete category error:${error}`);
    }
}

module.exports = {
    getAllRestaurants,
    getRestaurant,
    createRestaurant,
    editRestaurant,
    deleteRestaurant
}