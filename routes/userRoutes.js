const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//define routes

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:userid', userController.getUserById);
router.put('/users/:userid', userController.updateUser);
router.delete('/users/:userid', userController.deleteUser); 
router.post('/users/signin', userController.signIn);

module.exports = router;