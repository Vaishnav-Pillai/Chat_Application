var express = require('express');
var router = express.Router();
const userController = require('../controller/user.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

//HTTP Verbs : Post - Create, Get - Read, Put - Update, Delete

router.post('/login',userController.login);

router.post('/register',userController.register);

router.get('/fetchUsers', protect, userController.fetchAllUsers);

// router.get('/providers',mainController.readAll);

// router.get('/providers/:id',mainController.readOne);

// router.put('/providers/:id',mainController.update);

// router.delete('/providers/:id',mainController.deleteOne);

// router.delete('/providers',mainController.deleteAll);

module.exports = router;