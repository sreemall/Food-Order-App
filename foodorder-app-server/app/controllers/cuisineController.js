const Cuisines = require ("../models/cuisineModel");

const getAllCuisines = async (req, res) => {
    try {
        const cuisines = await Cuisines.find ({isActive: true});

        res.status (200).json ({
            data: cuisines,
            message: "Successfully all cuisines"
        });
    }
    catch (error) {
        res.status (500).json ({
            message: "Error while fetching cuisines",
            error: error.message
        });
    }
}

const getCuisine = async (req, res) => {
    const cuisineID = req.params.id;
    try {
        const cuisine = Cuisines.findOne ({_id: cuisineID, isActive: true});
        res.statu(200).json ({
            data: cuisine,
            message: "Successfully fetched cuisine"
        });
    }
    catch (error) {
        res.status (500).json ({
            message: "Error while fetching cuisine",
            error: error.message
        })
    }
}

const createCuisine = async (req, res) => {
    try {
        const newCuisine = await Cuisines.create ({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        });
        if (!newCuisine) {
            res.status(400);
            throw new Error(`Cuisine create failed.`);
        }
        else {
            const result = await newCuisine.save ();
            if (result) {
                res.status(200).json({
                  message: `Cuisine is successfully created ${req.body.name}`,
                });
              } else {
                res.status(400);
                throw new Error(`Cuisine create failed`);
              }
        } 
    }
    catch (error) {
        console.error(error);
        res.status (500).json ({
                    message: "Error while Creating Cuisine",
                    error: error.message
        });
    }
}

const editCuisine = async (req, res) => {

    try {
        const cuisineID = req.params.id;
        const cuisine = await Cuisines.findOne ({_id: cuisineID, isActive: true});
        if (!cuisine) {
            res.status(400);
            throw new Error(`Cuisine Edit failed since category with id: ${cuisineID} not found`);
        }
        else {
            cuisine.name = req.body.name;
            cuisine.description = req.body.description;
            cuisine.image = req.body.image;

            const updatedCuisine = await cuisine.save ();
            if (updatedCuisine) {
                res.status(200).json({
                  message: `Cuisine is successfully edited ${req.body.name}|${req.body.id}`,
                });
              } else {
                res.status(400);
                throw new Error(`Cuisine editing failed`);
              }
        }
    }
    catch (error) {
        res.status (500).json ({
            message: "Error while updating cuisine",
            error: error.message
        });
    }
}

const deleteCuisine = async (req, res) => {
    try {
        const cuisineID = req.params.id;
        const cuisine = await Cuisines.findOne ({_id: cuisineID, isActive: true});
        if (!cuisine) {
            res.status(400);
            throw new Error(`Cuisine Delete failed since cuisine with id: ${cuisineID} not found`);
        }
        else {
            cuisine.isActive = false;
            const updatedCuisine = await cuisine.save ();
            if (updatedCuisine) {
                res.status(200).json({
                  message: `Cuisine is successfully deleted`,
                });
              } else {
                res.status(400);
                throw new Error(`Cuisine delete failed`);
              }
        }
    }
    catch (error) {
        res.status (500).json ({
            message: "Error while delete cuisine",
            error: error.message
        });
    }
}


module.exports = {
    getAllCuisines,
    getCuisine,
    createCuisine,
    editCuisine,
    deleteCuisine
}

