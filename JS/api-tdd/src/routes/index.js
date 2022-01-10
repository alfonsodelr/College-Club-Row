var express = require('express');
var router = express.Router();
var clubController = require('../controllers/club.js')
router.get('/', async function (req, res) {
    res.sendStatus(200)
});

module.exports = router;
