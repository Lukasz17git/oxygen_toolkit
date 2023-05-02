import { useDispatch, useSelector } from "react-redux"
import baseCheckboxs from "../Data/baseCheckboxs"
import { useLanguage } from "../Hooks/useLanguage"
import { createSelectorFromStringPath } from "maraj"
import { setValue } from "../Store/rootReducers"

const Checkbox = ({ storePath, id, label = baseCheckboxs[id], required = false, className = 'checkbox-app' }) => {

    const fullStorePath = `${storePath}.${id}`
    const { label: translatedLabel } = useLanguage({ label })

    const value = useSelector(createSelectorFromStringPath(fullStorePath))

    const dispatch = useDispatch()
    const hanleClick = () => dispatch(setValue(fullStorePath, c => !c))

    return (
        <label className="checkbox">
            <input
                className={className}
                required={required}
                name={id}
                checked={value}
                type="checkbox"
                onChange={hanleClick}
            />
            {value && <img className="i-check" src='/CriticalIcons/check.png' loading="lazy" alt={id} />}
            {required && !value && <span>*</span>}
            {translatedLabel}
        </label>
    )
}
export default Checkbox