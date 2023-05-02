const { typeErrors } = require("../Error/errorList")
const { newFieldError } = require("../Error/generateError")


const emailCheck = (email, errorNameField) => {
    const newError = newFieldError(errorNameField)

    if (!email) throw newError(typeErrors.missing)
    if (typeof email !== 'string') throw newError(typeErrors.invalid)
    if (!email.includes('@')) throw newError(typeErrors.invalid)
    if (email.length < 5) throw newError(typeErrors.tooShort)
    if (email.length > 60) throw newError(typeErrors.tooLong)
    return
}

module.exports = { emailCheck }