const express = require ("express");
const { getCategory, getAllCategories, createCategory, editCategory, deleteCategory } = require ("../controllers/categoryController");

// const editCategory = () => {}
// const deleteCategory = () => {};

const categoryRouter = express.Router();


categoryRouter.route ("/").get (getAllCategories)
                        .post (createCategory);

categoryRouter.route ("/:id").get (getCategory)
                            .put (editCategory)
                            .delete (deleteCategory);
                            


module.exports = categoryRouter;