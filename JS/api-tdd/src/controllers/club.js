var { Club } = require('../db/index.js')
const uuid = require('uuid')
const clubController = {
    getClub: async function (req, res, next) {
        let clubExist = await Club.findOne({
            raw: true,
            where: { id: req.body.id },
        });
        res.status(200).json({ id: req.body.id, club: clubExist })
    },
    createClub: async function (req, res, next) {
        const name = req.body.name;
        const id = uuid.v4();
        let newClub = await Club.create({
            name
        });
        res.status(200).json({ id })
    }
}


module.exports = clubController;