var express = require('express');
var router = express.Router();
var sendInquiry = require('../controllers/emailControllers/sendInquiry')

// Send inquiry email
router.post('/inquiry', sendInquiry.sendEmail)

module.exports = router;