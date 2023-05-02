const { typeErrors } = require("../Error/errorList")
const { newFieldError } = require("../Error/generateError")


const passwordCheck = (password, errorNameField) => {
    const newError = newFieldError(errorNameField)

    if (!password) throw newError(typeErrors.missing)
    if (typeof password !== 'string') throw newError(typeErrors.invalid)
    if (password.length < 5) throw newError(typeErrors.tooShort)
    if (password.length > 60) throw newError(typeErrors.tooLong)
    return null
}

module.exports = { passwordCheck }