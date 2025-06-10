const Categories = require ("../models/CategoryModel");


const getAllCategories = async (req, res) => {
    
    try {
        const categories = await Categories.find ({isActive: true});

        res.status(200).json({
            data: categories,
            message: "Successfully fetched all categories.",
          });
    }
    catch (error) {
        console.error(error);
        res.status (500).json ({
                    message: "Error fetching categories",
                    error: error.message
        });
    }
    // catch (error) {
    //     throw new Error (`Error while fetching all categories error:${error}`);
}

const getCategory = async (req, res) => {

    try {
        const catID = req.params.id;

        const category = await Categories.find ({_id: catID, isActive: true});
        res.status(200).json ({
            status: "success",
            data: category
        });
    }
    catch (error) {
        console.error(error);
        res.status (500).json ({
                    message: "Error while fetching category",
                    error: error.message
        });
        // throw new Error (`Error while fetching category error:${error}`);
    }
}

const createCategory = async (req, res) => {
    try {
        const newCategory = await Categories.create ({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        });
        if (!newCategory) {
            res.status(400);
            throw new Error(`Category create failed.`);
        }
        else {
            const result = await newCategory.save ();
            if (result) {
                res.status(200).json({
                  message: `Category is successfully created ${req.body.name}`,
                });
              } else {
                res.status(400);
                throw new Error(`Category create failed`);
              }
        } 
    }
    catch (error) {
        console.error(error);
        res.status (500).json ({
                    message: "Error while Creating category",
                    error: error.message
        });
        // throw new Error (`Error while Creating category error:${error}`);
    }
}

const editCategory = async (req, res) => {

    try {
        const catID = req.params.id;
        const category = await Categories.findOne ({_id: catID, isActive: true});
        if (!category) {
            res.status(400);
            throw new Error(`Category Edit failed since category with id: ${catID} not found`);
        }
        else {
            category.name = req.body.name;
            category.description = req.body.description;
            category.image = req.body.image;

            const updatedCategory = await category.save ();
            if (updatedCategory) {
                res.status(200).json({
                  message: `Category is successfully edited ${req.body.name}|${req.body.id}`,
                });
              } else {
                res.status(400);
                throw new Error(`Category editing failed`);
              }
        }
    }
    catch (error) {
        res.status (500).json ({
            message: "Error while updating category",
            error: error.message
        });
        // throw new Error (`Error while updating category error:${error} body: ${req.body}`);
    }
}

const deleteCategory = async (req, res) => {
    try {
        const catID = req.params.id;
        const category = await Categories.findOne ({_id: catID, isActive: true});
        if (!category) {
            res.status(400);
            throw new Error(`Category Delete failed since category with id: ${catID} not found`);
        }
        else {
            category.isActive = false;
            const updatedCategory = await category.save ();
            if (updatedCategory) {
                res.status(200).json({
                  message: `Category is successfully deleted`,
                });
              } else {
                res.status(400);
                throw new Error(`Category delete failed`);
              }
        }
    }
    catch (error) {
        res.status (500).json ({
            message: "Error while delete category",
            error: error.message
        });
        // throw new Error (`Error while delete category error:${error}`);
    }
}

module.exports = {
    getCategory,
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory
}
