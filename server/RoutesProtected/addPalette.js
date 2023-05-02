const router = require('express').Router()
const User = require('../DbModels/User')
const { locationErrors, fieldErrors } = require('../Error/errorList')
const { notFoundError } = require('../Error/generateError')
const { handleError } = require('../Error/handleError')


router.use('/', async (req, res) => {

    try {
        const { userID } = req.user
        const palette = req.body
        // could be added some kind of validation in palette
        const update = await DB_addPalette(userID, palette)
        console.log('update', update)
        res.send(update)
    } catch (error) {
        const handledError = handleError(error, locationErrors.palettes)
        res.status(handledError.status).send(handledError)
    }
})

module.exports = router

const DB_addPalette = (userID, palette) => new Promise((resolve, reject) => {
    const query = { _id: userID }
    const toUpdate = { $push: { palettes: palette } }
    const toReturn = { new: true, projection: { nonExistentKey: 1, palettes: { $slice: -1 } } } //if there is no "nonexistentkey" it ll return all the user data, seems like a bug
    User.findOneAndUpdate(query, toUpdate, toReturn).exec()
        .then(response => response ? resolve(response) : reject(notFoundError(fieldErrors.user)))
        .catch(error => reject(error))
})