var express = require('express');
var router = express.Router();
var { Club } = require('../db/index.js')

/* GET home page. */
router.get('/', async function (req, res, next) {
  let newClub = await Club.create({
    ids: "1"
  });
  res.status(200).send(JSON.stringify({ a: "aaa" }))
});

module.exports = router;
