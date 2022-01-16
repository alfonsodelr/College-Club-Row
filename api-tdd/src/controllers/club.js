var { Club } = require('../db/index.js')
const clubController = {
    getClub: async function (req, res, next) {

        res.status(200).send(JSON.stringify({ a: "you have creatredd a club" }))
    }
}


module.exports = clubController;