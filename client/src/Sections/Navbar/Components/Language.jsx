import { useContext } from "react"
import { LanguageContext } from "../../../Hooks/useLanguage"

const Language = () => {
    const { selectedLanguage, toggleLanguage } = useContext(LanguageContext)
    return (
        <button onClick={toggleLanguage} className='i' aria-label="language">
            <img className='i-language' src={`/CriticalImages/${selectedLanguage}.webp`} alt={`${selectedLanguage}-flag`} loading="lazy" />
        </button>
    )
}
export default Language