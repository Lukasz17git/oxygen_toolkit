import { useLanguage } from "../../../Hooks/useLanguage"
import { unitsText } from "../../../Data/converterUnits.js"
import { calculateTargetValue } from "../utils"
import { useTypedSelector } from "../../../Store/store"
import { removeValue } from "../../../Store/rootReducers"
import { saveConverterDataToLocalStore } from "../../../Utils/LocalStore/localStore"
import useDispatchErrorWrappedThunk from "../../../Hooks/useDispatchErrorWrappedThunk"
import isRunningLocally from "../../../Utils/isRunningLocally"
import axios from 'redaxios'
import { authOptions, deleteConversionUri } from "../../../Data/uris"


const SavedConversion = ({ index }) => {

  const translatedText = useLanguage(unitsText)

  const { originUnit, targetUnit, value, _id } = useTypedSelector(state => state.converter.savedConversions[index])
  const targetValue = calculateTargetValue(value, originUnit, targetUnit)

  const originText = translatedText[originUnit]
  const targetText = translatedText[targetUnit]

  const { dispatchErrorWrappedThunk } = useDispatchErrorWrappedThunk()
  const removeSavedConversion = async () => {
    dispatchErrorWrappedThunk(async (dispatch, getState) => {
      let indexToRemove = index
      if (!isRunningLocally && getState().user._id) {
        await axios.post(deleteConversionUri, { _id }, authOptions())
        const indexAfterUpdate = getState().converter.savedConversions.findIndex(conversion => conversion._id === _id)
        indexToRemove = indexAfterUpdate
      }
      dispatch(removeValue('converter.savedConversions', indexToRemove))
      const savedConversions = getState().converter.savedConversions
      await saveConverterDataToLocalStore(savedConversions)
    })
  }

  return (
    <div className="converter-saved-component">
      <div>
        <span className="tw">{`${value} ${originText}`}</span>
        <span>{" -> "}</span>
        <span className="tw">{`${targetValue} ${targetText}`}</span>
      </div>
      <button className="i" onClick={removeSavedConversion}>
        <img className="i-cross" src="/CriticalIcons/cross.svg" loading="lazy" alt="remove" />
      </button>
    </div>
  )
}
export default SavedConversion