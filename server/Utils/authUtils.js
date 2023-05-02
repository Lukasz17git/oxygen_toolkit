require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { generateError } = require('../Error/generateError')
const { fieldErrors, typeErrors } = require('../Error/errorList')

const handleLoginAttempts = (loginAttempts, lastLoginDateAttempt) => new Promise((resolve, reject) => {
    const attemptDelay = Date.now() - (lastLoginDateAttempt || 0)
    const maxAllowedDelay = 30 * 60 * 1000 //milliseconds
    const maxAllowedLoginAttempts = 9
    if (attemptDelay <= maxAllowedDelay && loginAttempts >= maxAllowedLoginAttempts) return reject(generateError(fieldErrors.password, typeErrors.maxAttempts))
    return resolve({ loginAttempts: attemptDelay > maxAllowedDelay ? 1 : loginAttempts + 1, lastLoginDateAttempt: Date.now() })
})

const comparePasswords = async (reqPassword, password, attemptData) => new Promise(async (resolve, reject) => {
    const result = await bcrypt.compare(reqPassword, password)
    if (!result) return reject(generateError(fieldErrors.password, typeErrors.invalid, attemptData));
    resolve()
})

const createJWTandCookie = (secret, expireTime, jwtUserData) => {
    const maxAge = expireTime * 1000 //milliseconds
    const jwtToken = jwt.sign(jwtUserData, secret, { expiresIn: expireTime })
    const cookieOptions = { httpOnly: true, maxAge, signed: true }
    const expireDate = Date.now() + maxAge
    return { jwtToken, cookieOptions, expireDate }
}

const verifyJWT = (token, secret) => new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
        if (!err) return resolve(decoded)
        if (err.name === 'TokenExpiredError') return reject(generateError(fieldErrors.session, typeErrors.expired))
        if (err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError') return reject(generateError(fieldErrors.session, typeErrors.invalid))
        return reject(err)
    })
})

const createSessionCredentials = (jwtUserData) => {
    const secret = process.env.JWT_SECRET_SESSION
    const expireTime = 60 * 60 * 24 * 7 //seconds
    return createJWTandCookie(secret, expireTime, jwtUserData)
}

const verifySessionCredentials = (token) => {
    const secret = process.env.JWT_SECRET_SESSION
    return verifyJWT(token, secret)
}

const removeAllCookies = (res) => {
    res.cookie(process.env.JWT_SECRET_SESSION, '', { maxAge: 0 })
    return res
}

module.exports = {
    handleLoginAttempts, comparePasswords,
    createSessionCredentials, verifySessionCredentials,
    removeAllCookies
}