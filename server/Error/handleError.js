const { generateFullError } = require('./generateError')
const { typeErrors, fieldErrors } = require('./errorList')

const handleError = (error, location) => {
    const newError = generateFullError(location)


    //custom server/app errors
    if (error.customError === true && error.field && error.type) return newError(400, error.field, error.type, error.additionalErrorData)


    //bycrypt errors
    if (error.message.startsWith('Illegal arguments')) return newError(400, fieldErrors.password, typeErrors.invalid)
    

    // mongoose/mongodb errors
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const field = Object.keys(error.keyValue)[0]
        return newError(400, field, typeErrors.alreadyExists, error.keyValue[field])
    }

    if (error.name === 'ValidationError') {
        const field = Object.keys(error.errors)[0]
        if (error.errors[field].kind === 'required') return newError(400, field, typeErrors.missing)
        return newError(400, field, typeErrors.invalid)
    }
    if (error.name === 'CastError') {
        const field = error.path
        return newError(400, field, typeErrors.invalid)
    }

    // unknown/not handled errors, these errors can be stored in a file or in a db to be able to catch them
    console.log('unknown/not handled error', error)
    return newError(500, 'unknown', 'unknown', error.message)
}

module.exports = { handleError }