import { retrieveFromKeyItsOriginAndTargetUnit } from "../Sections/UnitConverter/utils"
import { useTypedSelector } from "../Store/store"

// i dont like this being called three times (in Result, in Flip and in Save/Like)
// i could have called it only one time in the first shared parent between those 3 Components
// but in the end i think its almost same performance taking in consideration the trade offs.

export const useSelectedConversionUnits = () => {
    const selectedUnits = useTypedSelector(state => state.converter.converterSelectedUnits)
    const { originUnit, targetUnit } = retrieveFromKeyItsOriginAndTargetUnit(selectedUnits)
    const isOriginUnitAvailable = useTypedSelector(state => originUnit && state.converter.converterOptions[originUnit])
    const isTargetUnitAvailable = useTypedSelector(state => targetUnit && state.converter.converterOptions[targetUnit])
    const areUnitsAvailable = isOriginUnitAvailable && isTargetUnitAvailable
    return { areUnitsAvailable, originUnit, targetUnit }
}

export const useIsSelectedConversionUnitAvailable = () => useTypedSelector(state => {
    const { originUnit, targetUnit } = retrieveFromKeyItsOriginAndTargetUnit(state.converter.converterSelectedUnits)
    const isOriginUnitAvailable = originUnit && state.converter.converterOptions[originUnit]
    const isTargetUnitAvailable = targetUnit && state.converter.converterOptions[targetUnit]
    const areUnitsAvailable = isOriginUnitAvailable && isTargetUnitAvailable
    return areUnitsAvailable
})
