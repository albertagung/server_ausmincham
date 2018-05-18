var express = require('express');
var router = express.Router();
var mailchimpController = require('../controllers/mailchimpController')

// Insert new subscriber
router.post('/subscribe', mailchimpController.insertNewSubscriber)

module.exports = router;