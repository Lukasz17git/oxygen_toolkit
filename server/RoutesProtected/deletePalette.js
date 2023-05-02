const router = require('express').Router()
const User = require('../DbModels/User')
const { fieldErrors, locationErrors } = require('../Error/errorList')
const { notFoundError } = require('../Error/generateError')
const { handleError } = require('../Error/handleError')
const { mongoIdCheck } = require('../Validators/mongoIdCheck')


router.use('/', async (req, res) => {

    try {
        const { userID } = req.user
        const { _id } = req.body
        mongoIdCheck(_id, fieldErrors.id)
        const response = await DB_deletePalette(userID, _id)
        res.send(response)

    } catch (error) {
        const handledError = handleError(error, locationErrors.palettes)
        res.status(handledError.status).send(handledError)
    }
})

const DB_deletePalette = (userID, paletteID) => new Promise((resolve, reject) => {
    const query = { _id: userID, 'palettes._id': paletteID }
    const toUpdate = { $pull: { palettes: { _id: paletteID } } }
    const toReturn = { new: true, projection: { _id: 1 } }
    User.findOneAndUpdate(query, toUpdate, toReturn).exec()
        .then(response => response ? resolve(response) : reject(notFoundError(fieldErrors.user)))
        .catch(error => reject(error))
})

module.exports = router