const { response } = require('express');
var { Club } = require('../db/index.js')
const { validate: validateUUID } = require('uuid');
const clubController = {
    getClub: async function (req, res, next) {
        try {
            //validate param
            let clubName = req.body.name;
            if (!clubName || (typeof clubName) !== 'string')
                return res.status(422).json({ msg: "Incorrect Param" })

            //findOne
            let clubExist = await Club.findOne({
                raw: true,
                where: { name: clubName },
            }).catch(err => {
                throw `Club not found ${clubName}`
            });

            return res.status(200).json({ clubExist })
        } catch (error) {
            return res.status(422).json({ msg: `\n Unexpected Error: \n \n \n ${error}` })
        }
    },
    createClub: async function (req, res, next) {
        try {
            // validate param 
            const name = req.body.name;
            if (!name || typeof name !== 'string')
                return res.status(422).json({ msg: "Incorrect Param" });

            //create
            let newClub = await Club.create({
                name
            }).catch(err => res.status(400).json({ msg: `failed to create club: \n \n ${err}` }))

            return res.status(200).json({ newClub })
        } catch (error) {
            return res.status(422).json({ msg: `\n Unexpected Error: \n \n \n ${error}` })
        }
    },
    getAll: async function (req, res, next) {
        try {
            let clubs = await Club.findAll()
                .catch(err => res.status(400).json({ msg: `failed to get clubs: \n \n ${err}` }));

            return res.status(200).json({ clubs })
        } catch (error) {
            return res.status(422).json({ msg: `\n Unexpected Error: \n \n \n ${error}` })
        }

    },
    updateClub: async function (req, res, next) {
        const id = req.body.id;
        const data = req.body.data;
        if (!id || !data.name) return res.status(400).json({ msg: `Update club failed. missing param. \n` })

        Club.update(
            data,
            { where: { id: id } }
        )
            .then(result =>
                res.status(200).json(data)
            )
            .catch(err =>
                res.status(400).json({ msg: `Update club failed. \n ${err}` })
            )
    },
    deleteClub: async function (req, res, next) {
        const id = req.body.id;
        if (!id || validateUUID(id))
            return res.status(400).json({ msg: `Destroy club failed. missing param. \n` })

        Club.destroy({
            where: {
                id: id
            }
        }).then(result =>
            res.status(200).json({ id })
        ).catch(err =>
            res.status(400).json({ msg: `Destroy club failed. \n ${err}` })
        )
    }
}
module.exports = clubController;
