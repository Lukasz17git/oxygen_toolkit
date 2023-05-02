require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { passwordCheck } = require('../Validators/passwordCheck')
const { emailCheck } = require('../Validators/emailCheck')
const { stringCheck } = require('../Validators/stringCheck')
const { handleError } = require('../Error/handleError')
const User = require('../DbModels/User')
const { locationErrors, fieldErrors } = require('../Error/errorList')
const { createSessionCredentials, removeAllCookies } = require('../Utils/authUtils')


router.use('/', async (req, res) => {

    try {
        const { email, username, password } = req.body
        passwordCheck(password, fieldErrors.password)
        emailCheck(email, fieldErrors.email)
        stringCheck(username, fieldErrors.username, 100)

        const encryptedPassword = await bcrypt.hash(password, 10)
        const DB_User = new User({ username, email, password: encryptedPassword })
        const user = await DB_User.save()

        const { loginAttempts, password: dbPassword, lastLoginDateAttempt, ...userDataToSend } = user.toObject()

        const { jwtToken, cookieOptions } = createSessionCredentials({ userID: userDataToSend._id.toString() })
        removeAllCookies(res)
        res.cookie(process.env.JWT_SECRET_SESSION, jwtToken, cookieOptions).send(userDataToSend)

    } catch (error) {
        const handledError = handleError(error, locationErrors.register)
        return res.status(handledError.status).send(handledError)
    }
})

module.exports = router
