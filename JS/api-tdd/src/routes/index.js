var express = require('express');
var router = express.Router();
var clubController = require('../controllers/club.js')
router.get('/', clubController.getClub);

module.exports = router;
