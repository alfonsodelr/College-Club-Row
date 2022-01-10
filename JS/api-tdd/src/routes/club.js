var express = require('express');
var router = express.Router();
var { Club } = require('../db/index.js')
const clubController = require("../controllers/club.js")

router.get('/', clubController.getClub);
router.get('/all', clubController.getAll)
router.post('/', clubController.createClub);
router.patch('/', clubController.updateClub);
router.delete('/',clubController.deleteClub);
module.exports = router;


