import { useSelector } from "react-redux"
import baseInputs from "../Data/baseInputs"
import baseSelects from "../Data/baseSelects"
import { useLanguage } from "../Hooks/useLanguage"
import { createSelectorFromStringPath } from "maraj"


const Field = ({ storePath, id, className = 'field-app', placeholder }) => {

    const fullStorePath = `${storePath}.${id}`
    placeholder = placeholder ?? baseInputs[id]?.placeholder ?? baseSelects[id]?.placeholder
    const { placeholder: translatedPlaceholder } = useLanguage({ placeholder })
    const value = useSelector(createSelectorFromStringPath(fullStorePath))

    return (
        <div className={className}>
            <b>{translatedPlaceholder}:</b>
            <span>{value}</span>
        </div>
    )
}

export default Field