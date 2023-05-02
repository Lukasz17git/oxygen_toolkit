import capitalizeWords from '../Utils/Formatters/capitalizeWords'
import numberFormatter from '../Utils/Formatters/numberFormatter'
import toLowerCase from '../Utils/Formatters/toLowerCase'
import emailCheck from '../Utils/Validators/emailCheck'
import passwordCheck from '../Utils/Validators/passwordCheck'
import repeatPasswordCheck from '../Utils/Validators/repeatPasswordCheck'

export default {
    username: {
        placeholder: {
            esp: 'Nombre de usuario',
            eng: 'Username'
        },
        formatters: capitalizeWords,
    },
    email: {
        placeholder: {
            esp: 'Correo electrónico',
            eng: 'Email'
        },
        formatters: toLowerCase,
        validators: emailCheck,
    },
    password: {
        placeholder: {
            esp: 'Contraseña',
            eng: 'Password'
        },
        type: 'password',
        validators: passwordCheck
    },
    repeatPassword: {
        placeholder: {
            esp: 'Repita su contraseña',
            eng: 'Repeat password'
        },
        type: 'password',
        validators: repeatPasswordCheck
    },
    converterInput: {
        placeholder: {
            esp: 'Número',
            eng: 'Number'
        },
        formatters: (value) => numberFormatter(value, 10)
    },
    paletteName: {
        placeholder: {
            esp: 'Nombre de la paleta',
            eng: 'Palette name'
        }
    }
}