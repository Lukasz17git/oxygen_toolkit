import { useDispatch } from "react-redux"
import { calculateTargetValue, generateUnitConversionKeyFromTwoUnits } from "../utils"
import { update } from "../../../Store/rootReducers"
import { useSelectedConversionUnits } from "../../../Hooks/useSelectedConversionUnits"

const FlipButton = () => {

    const { areUnitsAvailable, originUnit, targetUnit } = useSelectedConversionUnits()

    const dispatch = useDispatch()
    const handler = () => {
        if (!areUnitsAvailable || !originUnit || !targetUnit) return
        const flippedUnitsKey = generateUnitConversionKeyFromTwoUnits(targetUnit, originUnit)
        dispatch(update({
            ['converter.converterSelectedUnits']: flippedUnitsKey,
            ['converter.converterInput']: currentValue => calculateTargetValue(currentValue, originUnit, targetUnit)
        }))
    }

    return (
        <button onClick={handler} className="i">
            <img className="i-flip" src="/CriticalIcons/flip.svg" alt="flip" loading="lazy" />
        </button>
    )
}
export default FlipButton