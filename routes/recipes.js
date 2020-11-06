const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe-controller');

//-------ENDPOINTS-------

//List
router.get('/', recipeController.getAllRecipes);
//Search
router.get('/:idRecipe', recipeController.getRecipe);
//Post
router.post('/', recipeController.postRecipe);
//Patch
router.patch('/:idRecipe', recipeController.patchRecipe);
//Delete
router.delete('/:idRecipe', recipeController.deleteRecipe);

module.exports = router;