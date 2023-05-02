import { useLanguage } from "../Hooks/useLanguage"
import { cancel, back } from "../Data/baseButtons"

const Button = ({ children, text, handler, className = 'button-app' }) => {
    return (
        <button onClick={handler} className={className}>
            {text}
            {children}
        </button>
    )
}

export default Button


export const CancelButton = ({ handler, className }) => {
    const text = useLanguage({ cancel })
    return <Button text={text.cancel} handler={handler} className={className} />
}

export const BackButton = ({ handler, className }) => {
    const text = useLanguage({ back })
    return <Button text={text.back} handler={handler} className={className} />
}