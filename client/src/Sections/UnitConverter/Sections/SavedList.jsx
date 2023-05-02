import { useLanguage } from "../../../Hooks/useLanguage"
import SavedConversion from "../Components/SavedConversion"
import text from "../text"
import { useTypedSelector } from "../../../Store/store"


const SavedList = () => {

  const { savedTitle } = useLanguage(text)

  const savedConversionLength = useTypedSelector(state => state.converter.savedConversions.length)
  const arrayOfSavedConversions = Array(savedConversionLength).fill()

  return (
    <>
      <h3 className="converter-saved-title">{savedTitle}</h3>
      <div className="converter-saved-list">
        {arrayOfSavedConversions.map((_, index) => (
          <SavedConversion key={index} index={index} />
        ))}
      </div>
    </>
  )
}
export default SavedList