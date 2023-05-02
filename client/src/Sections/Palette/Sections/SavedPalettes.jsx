import { useLanguage } from "../../../Hooks/useLanguage"
import { useTypedSelector } from "../../../Store/store"
import SavedPalette from "../Components/SavedPalette"
import text from "../text"


const SavedPalettes = () => {
    const { savedTitle } = useLanguage(text)

    const savedPalettesLength = useTypedSelector(state => state.palette.savedPalettes.length)
    const palettesArray = Array(savedPalettesLength).fill()
    return (
        <div>
            <h3 className="palette-saved-title">{savedTitle}</h3>
            <div className="palette-saved-list">
                {palettesArray.map((_, index) => (
                    <SavedPalette key={index} index={index} />
                ))}
            </div>
        </div>
    )
}
export default SavedPalettes