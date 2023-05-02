
const locationErrors = {
    register: 'register',
    login: 'login',
    logout: 'logout',
    getData: 'getData',
    session: 'session',
    palettes: 'palettes',
    conversions: 'conversions'
}

const fieldErrors = {
    email: 'email',
    password: 'password',
    username: 'username',
    user: 'user',
    session: 'session',
    id: 'id'
}

const typeErrors = {
    missing: 'missing',
    invalid: 'invalid',
    tooShort: 'tooShort',
    tooLong: 'tooLong',
    notFound: 'notFound',
    alreadyExists: 'alreadyExists',
    maxAttempts: 'maxAttempts',
    expired: 'expired',
    lengthError: 'lengthError',
}


module.exports = { locationErrors, fieldErrors, typeErrors }