var express = require('express');
var router = express.Router();
var { Club } = require('../db/index.js')
const clubController = require("../controllers/club.js")

router.get('/', clubController.getClub);

router.post('/', async function (req, res, next) {
    // let newClub = await Club.create({
    //     ids: "1", name: "ags"
    // });
    res.status(200).send(JSON.stringify({ a: "you posted a club" }))
});
module.exports = router;


//1. create club database.
//2. 