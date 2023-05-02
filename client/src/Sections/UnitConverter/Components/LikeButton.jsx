import { useEffect, useRef, useState } from "react"
import { useTypedSelector } from "../../../Store/store"
import useDispatchErrorWrappedThunk from '../../../Hooks/useDispatchErrorWrappedThunk'
import { retrieveFromKeyItsOriginAndTargetUnit } from "../utils"
import { spreadValue } from "../../../Store/rootReducers"
import { saveConverterDataToLocalStore } from "../../../Utils/LocalStore/localStore"
import { useIsSelectedConversionUnitAvailable } from "../../../Hooks/useSelectedConversionUnits"
import axios from 'redaxios'
import { authOptions } from "../../../Data/uris"
import { addConversionUri } from "../../../Data/uris"
import isRunningLocally from "../../../Utils/isRunningLocally"


const LikeButton = () => {

  const [hasRecentlyBeenSaved, setHasRecentlyBeenSaved] = useState(false)
  const previousRenderSavedState = useRef(false)

  const hasInputValueChangedAfterSave = useTypedSelector(state => hasRecentlyBeenSaved && state.converter.converterInput)
  const hasSelectedUnitsValueChangedAfterSave = useTypedSelector(state => hasRecentlyBeenSaved && state.converter.converterSelectedUnits)

  const isInputValid = useTypedSelector(state => !!state.converter.converterInput)
  const isSelectedUnitAvailable = useIsSelectedConversionUnitAvailable()

  const { dispatchErrorWrappedThunk } = useDispatchErrorWrappedThunk()
  const save = () => {
    if (hasRecentlyBeenSaved || !isInputValid || !isSelectedUnitAvailable) return

    dispatchErrorWrappedThunk(async (dispatch, getState) => {

      const { converterInput, converterSelectedUnits } = getState().converter
      const { originUnit, targetUnit } = retrieveFromKeyItsOriginAndTargetUnit(converterSelectedUnits)

      let newSavedConversion = { value: converterInput, originUnit, targetUnit }

      if (!isRunningLocally && getState().user._id) {
        const { data } = await axios.post(addConversionUri, newSavedConversion, authOptions())
        newSavedConversion = data.conversions[0]
      }

      dispatch(spreadValue('converter.savedConversions', [newSavedConversion]))
      await saveConverterDataToLocalStore(getState().converter.savedConversions)
      setHasRecentlyBeenSaved(true)
    })
  }

  useEffect(() => {
    if (hasRecentlyBeenSaved) {
      if (previousRenderSavedState.current) {
        setHasRecentlyBeenSaved(false)
        previousRenderSavedState.current = false
      } else {
        previousRenderSavedState.current = true
      }
    }

  }, [hasInputValueChangedAfterSave, hasSelectedUnitsValueChangedAfterSave, hasRecentlyBeenSaved])

  return (
    <button className="i" onClick={save}>
      <img className="i-heart" src={`/CriticalIcons/${hasRecentlyBeenSaved ? 'heart-saved' : 'heart'}.svg`} alt="heart" loading="lazy" />
    </button>
  )
}
export default LikeButton