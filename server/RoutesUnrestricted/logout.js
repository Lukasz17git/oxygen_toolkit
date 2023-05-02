const router = require('express').Router()
const { locationErrors } = require('../Error/errorList')
const { handleError } = require('../Error/handleError')
const { removeAllCookies } = require('../Utils/authUtils')

router.use('/', async (req, res) => {
    try {
        removeAllCookies(res)
        res.sendStatus(200)

    } catch (error) {
        const handledError = handleError(error, locationErrors.logout)
        res.status(handledError.status).send(handledError)
    }
})

module.exports = router