const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

//-------ENDPOINTS-------

//List
router.get('/', userController.getAllUsers);
//Search
router.get('/:idUser', userController.getUser);
//Post
router.post('/', userController.postUser);
//Patch
router.patch('/:idUser', userController.patchUser);
//Delete
router.delete('/:idUser', userController.deleteUser);

module.exports = router;