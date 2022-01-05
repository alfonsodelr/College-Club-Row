var express = require('express');
var router = express.Router();
var { Club } = require('../db/index.js')
const clubController = require("../controllers/club.js")

router.get('/', clubController.getClub);

router.post('/', clubController.createClub);
module.exports = router;


//1. create club database.
//2. 