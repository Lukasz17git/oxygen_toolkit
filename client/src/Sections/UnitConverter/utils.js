import { valuesRelatedToOneMeter } from "../../Data/converterUnits"

const stringBetweenOriginAndTargetUnit = ' -> '

export const generateUnitConversionKeyFromTwoUnits = (originUnit, targetUnit) => originUnit + stringBetweenOriginAndTargetUnit + targetUnit

export const retrieveFromKeyItsOriginAndTargetUnit = (unitConversionKey, stringBetweenUnits = stringBetweenOriginAndTargetUnit) => {
    const [originUnit, targetUnit] = unitConversionKey.split(stringBetweenUnits)
    if (!originUnit || !targetUnit) return {}
    return { originUnit, targetUnit }
}

export const generateAllAvailableUnitCombinationsWithTranslation = (listOfUnits = [], currentLanguageUnits) => {
    const options = []
    const optionsLanguageMap = {}
    for (let i = 0; i < listOfUnits.length; i++) {
        const originUnit = listOfUnits[i];
        const remainingUnits = [...listOfUnits.slice(0, i), ...listOfUnits.slice(i + 1)]
        for (const targetUnit of remainingUnits) {
            const option = generateUnitConversionKeyFromTwoUnits(originUnit, targetUnit)
            const label = generateUnitConversionKeyFromTwoUnits(currentLanguageUnits[originUnit], currentLanguageUnits[targetUnit])
            options.push(option)
            optionsLanguageMap[option] = label
        }
    }
    return { options, optionsLanguageMap }
}

export const calculateTargetValue = (stringValue, originUnit, targetUnit, decimals = 2) => {
    if (!stringValue || !originUnit || !targetUnit) return ''
    const floatValue = parseFloat(stringValue)
    const originMultiplier = valuesRelatedToOneMeter[originUnit]
    const targetMultiplier = valuesRelatedToOneMeter[targetUnit]
    if (stringValue === '0' || targetMultiplier === 0) return '0'
    if (!floatValue || !originMultiplier || !targetMultiplier) return ''
    const targetValue = floatValue * targetMultiplier / originMultiplier
    const asString = Number(Math.round(targetValue + 'e' + decimals) + 'e-' + decimals).toString()
    return asString === '0' ? '≈0' : asString
}