import { useDispatch } from "react-redux"
import { useTypedSelector } from "../Store/store"
import { locationErrorsText, fieldErrorsText, typeErrorsText } from "./errorList"
import { setValue } from "../Store/rootReducers"
import { useLanguage } from "../Hooks/useLanguage"
import text from "./text"

const Error = () => {

    const error = useTypedSelector(state => state.error)

    const [translatedText, translatedLocationErrors,
        translatedFieldErrors, translatedTypeErrors] = useLanguage([text, locationErrorsText, fieldErrorsText, typeErrorsText])

    const locationErrorText = error && typeof error.location === 'string' && translatedLocationErrors[error.location]
    const fieldErrorText = error && typeof error.field === 'string' && translatedFieldErrors[error.field]
    const typeErrorText = error && typeof error.type === 'string' && translatedTypeErrors[error.type]

    const dispatch = useDispatch()
    const clearError = () => dispatch(setValue('error', null))

    return (error && (
        <button className='error-container' onClick={clearError}>
            <div className="error-title">
                <h2>{translatedText.title}</h2>
                <img className="i-error" src="/Icons/error.svg" loading="lazy" alt="error" />
            </div>
            {locationErrorText && (
                <div className="error-description">
                    <b>{translatedText.location}</b>
                    <span>{locationErrorText}</span>
                </div>
            )}
            {fieldErrorText && (
                <div className="error-description">
                    <b>{translatedText.field}</b>
                    <span>{fieldErrorText}</span>
                </div>
            )}
            {typeErrorText && (
                <div className="error-description">
                    <b>{translatedText.type}</b>
                    <span>{typeErrorText}</span>
                </div>
            )}
        </button>
    ))
}
export default Error