
// its used to generate all available errors from the transalted error objects
// the values of the keys are the keys itselfs and its used to create newError,
// being sure that the provided errorKeys exists in the translated error objects 
const generateErrorFields = (errorsWithLanguageValues) => {
    const errorList = {}
    for (const error of Object.keys(errorsWithLanguageValues)) {
        errorList[error] = error
    }
    return errorList
}


export const locationErrorsText = {
    unknown: {
        esp: 'desconocido',
        eng: 'unknown'
    },
    app: {
        esp: 'aplicación',
        eng: 'app'
    },
    localStorage: {
        esp: 'Autoguardado local',
        eng: 'Local autosave'
    },
    register: {
        esp: 'Registro',
        eng: 'Register'
    },
    login: {
        esp: 'Iniciar sesión',
        eng: 'Login'
    },
    logout: {
        esp: 'Cerrar sesión',
        eng: 'Logout'
    },
    getData: {
        esp: 'Obtener datos',
        eng: 'Retriving data'
    },
    session: {
        esp: 'Sesión',
        eng: 'Session'
    },
    palettes: {
        esp: 'Paleta de colores',
        eng: 'Color palettes'
    },
    conversions: {
        esp: 'Conversion de unidades',
        eng: 'Unit conversions'
    }
}

/**
 * Im exporting this to get all available error keys to use in the hole app
 * This is wrong, each key will have string of its key instead an language object
 * @type {typeof locationErrorsText }
 */
export const locationErrors = generateErrorFields(locationErrorsText)


export const fieldErrorsText = {
    unknown: {
        esp: 'desconocido',
        eng: 'unknown'
    },
    server: {
        esp: 'servidor',
        eng: 'server'
    },
    input: {
        esp: 'Input/entrada',
        eng: 'Input'
    },
    modal: {
        esp: 'Pop-up',
        eng: 'Pop-up'
    },
    email: {
        esp: 'Correo electrónico',
        eng: 'Email'
    },
    password: {
        esp: 'Contraseña',
        eng: 'Password'
    },
    username: {
        esp: 'Nombre de usuario',
        eng: 'Username'
    },
    user: {
        esp: 'Usuario',
        eng: 'User'
    },
    session: {
        esp: 'Sesión',
        eng: 'Session'
    },
    id: {
        esp: 'Identificación',
        eng: 'ID'
    }
}
/**
 * Im exporting this to get all available error keys to use in the hole app
 * This is wrong, each key will have string of its key instead an language object
 * @type {typeof fieldErrorsText }
 */
export const fieldErrors = generateErrorFields(fieldErrorsText)


export const typeErrorsText = {
    unknown: {
        esp: 'Desconocido',
        eng: 'Unknown'
    },
    server: {
        esp: 'Servidor',
        eng: 'Server'
    },
    missing: {
        esp: 'Faltante',
        eng: 'Missing'
    },
    invalid: {
        esp: 'Inválido',
        eng: 'Invalid'
    },
    tooShort: {
        esp: 'Muy corto',
        eng: 'Too short'
    },
    tooLong: {
        esp: 'Muy largo',
        eng: 'Too long'
    },
    notFound: {
        esp: 'No encontrado',
        eng: 'Not found'
    },
    alreadyExists: {
        esp: 'Ya existe',
        eng: 'Already exists'
    },
    maxAttempts: {
        esp: 'Número máximo de intentos',
        eng: 'Max number attempts'
    },
    expired: {
        esp: 'Expirado',
        eng: 'Expired'
    },
    lengthError: {
        esp: 'Longitud incorrecta',
        eng: 'Wrong length'
    }
}
/**
 * Im exporting this to get all available error keys to use in the hole app
 * This is wrong, each key will have string of its key instead an language object
 * @type {typeof typeErrorsText }
 */
export const typeErrors = generateErrorFields(typeErrorsText)