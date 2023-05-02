const { typeErrors } = require("../Error/errorList")
const { newFieldError } = require("../Error/generateError")

const regex = /[\p{L}|\p{N}|\p{P}|\s]/gu //alphanumeric, punctuation and space

const stringCheck = (string, errorNameField, maxLength = 60, required = true) => {
    const newError = newFieldError(errorNameField)

    if (!string && required === false) return null
    if (!string) throw newError(typeErrors.missing)
    if (typeof string !== 'string') throw newError(typeErrors.invalid)
    if (string.match(regex)?.join('') !== string) throw newError(typeErrors.invalid)
    if (string.length > maxLength) throw newError(typeErrors.tooLong)
    return null
}

module.exports = { stringCheck }