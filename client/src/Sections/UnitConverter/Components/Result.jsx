import { useLanguage } from "../../../Hooks/useLanguage"
import { calculateTargetValue } from "../utils"
import { useTypedSelector } from "../../../Store/store"
import { unitsText } from "../../../Data/converterUnits"
import { useSelectedConversionUnits } from "../../../Hooks/useSelectedConversionUnits"

const Result = () => {

    const textFromCurrentLanguage = useLanguage(unitsText)

    const { areUnitsAvailable, originUnit, targetUnit } = useSelectedConversionUnits()
    const inputValue = useTypedSelector(state => areUnitsAvailable && state.converter.converterInput)

    const targetValue = areUnitsAvailable && calculateTargetValue(inputValue, originUnit, targetUnit)
    const originText = areUnitsAvailable && textFromCurrentLanguage[originUnit]
    const targetText = areUnitsAvailable && textFromCurrentLanguage[targetUnit]

    const shouldResultBeDisplayed = targetValue && originText && targetText

    return (
        <div className="converter-calculator-result">
            {shouldResultBeDisplayed && (
                <>
                    <span className="tw">{`${inputValue} ${originText}`}</span>
                    <span>{" -> "}</span>
                    <span className="tw">{`${targetValue} ${targetText}`}</span>
                </>
            )}
        </div>
    )
}
export default Result