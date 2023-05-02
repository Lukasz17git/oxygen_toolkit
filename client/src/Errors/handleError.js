import { setValue } from "../Store/rootReducers"
import { fieldErrors, locationErrors, typeErrors } from "./errorList"

// const errorTemplate = { location: '', field: '', type: '', isLocalError: false }

const unknownError = { location: locationErrors.app, type: typeErrors.unknown }
const serverError = { location: locationErrors.app, type: typeErrors.server }
const runningWithoutServerError = { location: locationErrors.app, field: fieldErrors.server, type: typeErrors.missing }

export const newError = (location, field, type) => ({
    ...location && { location },
    ...field && { field },
    ...type && { type },
    isLocalError: true
})

export const setNewError = (location, field, type) => setValue('error', newError(location, field, type))

const handleError = (dispatch, error) => {

    const setError = (newError) => dispatch(setValue('error', newError))

    if (typeof error !== 'object') return setError(unknownError)

    if (error.isLocalError) return setError(error)

    if (error.status === 500) return setError(serverError)

    // can be removed if there is set-up for running app locally
    if (error.message === 'Failed to fetch') return setError(runningWithoutServerError)

    const data = error.data
    if (!data || typeof data !== 'object' || Array.isArray(data)) return setError(unknownError)

    return setError(error.data)
}

export default handleError