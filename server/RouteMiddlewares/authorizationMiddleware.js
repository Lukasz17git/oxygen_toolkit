const { fieldErrors, typeErrors, locationErrors } = require('../Error/errorList')
const { generateError } = require('../Error/generateError')
const { handleError } = require('../Error/handleError')
const { verifySessionCredentials, removeAllCookies } = require('../Utils/authUtils')

require('dotenv').config()

const authorizationMiddleware = async (req, res, next) => {

    try {
        const sessionCookie = req.signedCookies[process.env.JWT_SECRET_SESSION]
        if (!sessionCookie) throw generateError(fieldErrors.session, typeErrors.invalid)
        const { userID } = await verifySessionCredentials(sessionCookie)
        req.user = { userID }
        next()
    } catch (error) {
        const handledError = handleError(error, locationErrors.session)
        removeAllCookies(res)
        res.status(handledError.status).send(handledError)
    }
}

module.exports = authorizationMiddleware