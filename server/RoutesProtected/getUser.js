const User = require('../DbModels/User')
const { locationErrors, fieldErrors } = require('../Error/errorList')
const { notFoundError } = require('../Error/generateError')
const { handleError } = require('../Error/handleError')
const router = require('express').Router()


router.use('/', async (req, res) => {

    try {
        const { userID } = req.user
        const user = await DB_getUser(userID)
        res.send(user)
    } catch (error) {
        const handledError = handleError(error, locationErrors.getData)
        res.status(handledError.status).send(handledError)
    }
})

const DB_getUser = (userID) => new Promise((resolve, reject) => {
    const query = { _id: userID }
    const projection = { _id: 1, username: 1, email: 1, conversions: 1, palettes: 1 }
    User.findOne(query, projection).exec()
        .then(response => response ? resolve(response) : reject(notFoundError(fieldErrors.user)))
        .catch(error => reject(error))
})


module.exports = router