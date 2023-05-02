const router = require('express').Router()
const User = require('../DbModels/User')
const { fieldErrors, locationErrors } = require('../Error/errorList')
const { notFoundError } = require('../Error/generateError')
const { handleError } = require('../Error/handleError')
const { mongoIdCheck } = require('../Validators/mongoIdCheck')


router.use('/', async (req, res) => {

    try {
        const { userID } = req.user
        console.log(req.body)
        const { _id } = req.body
        mongoIdCheck(_id, fieldErrors.id)
        const response = await DB_deleteConversion(userID, _id)
        console.log(response)
        res.send(response)

    } catch (error) {
        console.log(error)
        const handledError = handleError(error, locationErrors.conversions)
        res.status(handledError.status).send(handledError)
    }
})

const DB_deleteConversion = (userID, conversionID) => new Promise((resolve, reject) => {
    const query = { _id: userID, 'conversions._id': conversionID }
    const toUpdate = { $pull: { conversions: { _id: conversionID } } }
    const toReturn = { new: true, projection: { _id: 1 } }
    User.findOneAndUpdate(query, toUpdate, toReturn).exec()
        .then(response => response ? resolve(response) : reject(notFoundError(fieldErrors.user)))
        .catch(error => reject(error))
})

module.exports = router