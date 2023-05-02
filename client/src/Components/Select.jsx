import { createSelectorFromStringPath } from "maraj"
import { useDispatch, useSelector } from "react-redux"
import { useLanguage } from "../Hooks/useLanguage"
import { setValue } from "../Store/rootReducers"
import baseSelects, { deletedValueText } from "../Data/baseSelects"


const Select = ({
    storePath,
    id,
    options = baseSelects[id].options,
    optionsMap = baseSelects[id].optionsMap,
    required = false,
    className = '',
    width }) => {

    const fullStorePath = `${storePath}.${id}`
    const baseSelect = baseSelects[id]
    const translatedText = useLanguage({ placeholder: baseSelect.placeholder, deletedValueText })
    const translatedOptionsMap = useLanguage(optionsMap)

    const value = useSelector(createSelectorFromStringPath(fullStorePath))

    const dispatch = useDispatch()
    const handleSelection = (e) => dispatch(setValue(fullStorePath, e.target.value))

    const isValueAvailable = value === '' || options.includes(value)

    return (
        <div className={`select ${className}`} style={width && { width: width + 'em' }}>
            <select
                className={(isValueAvailable ? '' : ' select-invalid')}
                required={required}
                value={value || ''}
                onChange={handleSelection}
            >
                <option disabled={!value} hidden={!value} value={''}>{(required ? '*' : '') + translatedText.placeholder}</option>
                {!isValueAvailable && <option disabled hidden value={value}>{translatedText.deletedValueText}</option>}
                {options.map(option => (
                    <option key={option} value={option}>{translatedOptionsMap[option]}</option>
                ))}
            </select>
            {value !== '' && (
                <span>
                    {translatedText.placeholder}
                </span>
            )}
        </div>
    )
}
export default Select