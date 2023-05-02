import { createSelectorFromStringPath } from "maraj"
import { useDispatch, useSelector } from "react-redux"
import baseInputs from "../Data/baseInputs"
import { useLanguage } from "../Hooks/useLanguage"
import { setValue } from "../Store/rootReducers"


const Input = ({ storePath, id, required = false, className = '', width }) => {

    const fullStorePath = `${storePath}.${id}`
    const { placeholder, formatters, validators, type } = baseInputs[id]
    const { placeholder: translatedPlaceholder } = useLanguage({ placeholder })

    const value = useSelector(createSelectorFromStringPath(fullStorePath))

    const dispatch = useDispatch()
    const formatAndUpdate = (e) => {
        const value = e.target.value
        const formattedValue = Array.isArray(formatters) ? formatters.reduce((formatted, f) => f(formatted), value) : formatters ? formatters(value) : value
        dispatch(setValue(fullStorePath, formattedValue))
    }

    //im passing dispatch as argument because some validators need to have access to the current store state, for example repeat password
    //im giving also the current path store, so it can reference data around it dynamically
    const isValid = Array.isArray(validators) ? validators.reduce((previousValidation, validator) => previousValidation && validator(value, dispatch, storePath), true) : validators ? validators(value, dispatch, storePath) : required ? !!value : true

    return (
        <div className={`input ${className}`} style={width && { width: width + 'em' }}>
            <input
                className={(value && !isValid ? 'input-invalid' : '') + (required && !isValid ? ' input-required' : '')}
                required={required}
                name={id}
                value={value}
                onChange={formatAndUpdate}
                type={type ?? 'text'}
                placeholder={translatedPlaceholder}
            />
            <span>
                {translatedPlaceholder}
            </span>
        </div >
    )
}
export default Input