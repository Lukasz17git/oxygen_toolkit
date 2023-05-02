const { typeErrors } = require('./errorList')

const generateError = (field = 'unknown', type = 'unknown', dataPlaceholder) => {
    const newError = {
        customError: true,
        field: field,
        type: type,
        dataPlaceholder: dataPlaceholder
    }
    return newError
}

const notFoundError = (field, dataPlaceholder) => generateError(field, typeErrors.notFound, dataPlaceholder)

const newFieldError = (field) => (type) => generateError(field, type)

const generateFullError = (location) => (status, field, type, additionalErrorData) => {
    const defaultError = 'unknown'
    const newError = {
        status: status ?? 400,
        location: location ?? defaultError,
        field: field ?? defaultError,
        type: type ?? defaultError,
        additionalErrorData: additionalErrorData ?? null
    }
    return newError
}

module.exports = { generateError, newFieldError, generateFullError, notFoundError }