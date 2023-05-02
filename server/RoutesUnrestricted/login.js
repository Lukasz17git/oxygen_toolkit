require('dotenv').config()
const router = require('express').Router()
const User = require('../DbModels/User')
const { fieldErrors, locationErrors } = require('../Error/errorList')
const { notFoundError } = require('../Error/generateError')
const { handleError } = require('../Error/handleError')
const { DB_updateUser } = require('../RoutesProtected/_db_updateUser')
const { handleLoginAttempts, createSessionCredentials, removeAllCookies, comparePasswords } = require('../Utils/authUtils')
const { emailCheck } = require('../Validators/emailCheck')
const { passwordCheck } = require('../Validators/passwordCheck')


router.use('/', async (req, res) => {
    try {
        const { email, password } = req.body
        passwordCheck(password, fieldErrors.password)
        emailCheck(email, fieldErrors.email)
        const dbUserData = await DB_getUserLoginData(email)
        const { _id, username, conversions, palettes } = dbUserData
        const userID = _id.toString()

        const attemptsDataToUpdate = await handleLoginAttempts(dbUserData.loginAttempts, dbUserData.lastLoginDateAttempt)
        attemptsDataToUpdate.userID = userID

        await comparePasswords(password, dbUserData.password, attemptsDataToUpdate) //added attemptData so i can update it in db if it throws an error (rejected)

        const { jwtToken, cookieOptions } = createSessionCredentials({ userID })
        removeAllCookies(res)
        res.cookie(process.env.JWT_SECRET_SESSION, jwtToken, cookieOptions).send({ _id, username, email, conversions, palettes })

    } catch (error) {
        const handledError = handleError(error, locationErrors.login)
        res.status(handledError.status).send(handledError)
        if (error.dataPlaceholder) {
            try {
                const { userID, ...updateData } = error.dataPlaceholder
                DB_updateUser(userID, updateData, false)
            } catch {
                console.log(`Error updating login attempts for the user ${error.dataPlaceholder.userID} with the following data: ${error.dataPlaceholder}`)
            }
        }
    }
})


const DB_getUserLoginData = (email) => new Promise((resolve, reject) => {
    const query = { email }
    const projection = { __v: false }
    User.findOne(query, projection)
        .exec()
        .then(response => response ? resolve(response) : reject(notFoundError(fieldErrors.user)))
        .catch(error => reject(error))
})


module.exports = router