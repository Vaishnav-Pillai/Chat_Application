var express = require('express');
var router = express.Router();
const messageController = require('../controller/message.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

//HTTP Verbs : Post - Create, Get - Read, Put - Update, Delete

router.get('/:chatId', protect, messageController.allMessages);

router.post('/', protect, messageController.sendMessage);

// router.get('/providers',mainController.readAll);

// router.get('/providers/:id',mainController.readOne);

// router.put('/providers/:id',mainController.update);

// router.delete('/providers/:id',mainController.deleteOne);

// router.delete('/providers',mainController.deleteAll);

module.exports = router;