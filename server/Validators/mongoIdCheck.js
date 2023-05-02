const { typeErrors } = require("../Error/errorList");
const { newFieldError } = require("../Error/generateError");


const mongoIdCheck = (mongoId, errorNameField, required = true) => {
    const newError = newFieldError(errorNameField)

    if (!mongoId && required === false) return;
    if (!mongoId) throw newError(typeErrors.missing)
    if (typeof mongoId !== 'string') throw newError(typeErrors.invalid)
    if (mongoId.length !== 24) throw newError(typeErrors.lengthError)
    return null
}

module.exports = { mongoIdCheck }