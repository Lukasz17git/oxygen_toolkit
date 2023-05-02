import { useLanguage } from '../../../Hooks/useLanguage'
import { generateAllAvailableUnitCombinationsWithTranslation } from '../utils'
import { litsOfUnits, unitsText } from '../../../Data/converterUnits'
import Select from '../../../Components/Select'
import { useTypedSelector } from '../../../Store/store'

const ConverterSelect = () => {

  const translatedUnitsText = useLanguage(unitsText)

  const converterOptions = useTypedSelector(store => store.converter.converterOptions)
  const availableListOfUnits = litsOfUnits.filter(unit => converterOptions[unit])
  const { options, optionsLanguageMap } = generateAllAvailableUnitCombinationsWithTranslation(availableListOfUnits, translatedUnitsText)

  return (
    <Select storePath='converter' id='converterSelectedUnits' options={options} optionsMap={optionsLanguageMap} className='converter-select' />
  )
}

export default ConverterSelect