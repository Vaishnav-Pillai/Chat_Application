var express = require('express');
var router = express.Router();
const chatController = require('../controller/chat.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

//HTTP Verbs : Post - Create, Get - Read, Put - Update, Delete

router.post('/',protect,chatController.accessChat);

router.get('/',protect,chatController.fetchChats);

router.post('/createGroups', protect, chatController.createGroupChat);

router.get('/fetchGroups', protect, chatController.fetchGroups);

router.put('/groupExit', protect, chatController.groupExit);

// router.get('/providers',mainController.readAll);

// router.get('/providers/:id',mainController.readOne);

// router.put('/providers/:id',mainController.update);

// router.delete('/providers/:id',mainController.deleteOne);

// router.delete('/providers',mainController.deleteAll);

module.exports = router;