
import { shallowEqual } from 'react-redux'
import { unitsText } from '../../../Data/converterUnits'
import { useLanguage } from '../../../Hooks/useLanguage'
import { useTypedSelector } from '../../../Store/store'
import Checkbox from '../../../Components/Checkbox'


const ConverterOptions = () => {

    const listOfUnits = useTypedSelector(store => Object.keys(store.converter.converterOptions), shallowEqual)
    const translatedUnits = useLanguage(unitsText)

    return (
        <div className='converter-options-wrapper'>
            <div className="converter-options-container">
                {listOfUnits.map(option => (
                    <Checkbox
                        key={option}
                        storePath='converter.converterOptions'
                        id={option}
                        label={translatedUnits[option]}
                        className='converter-checkbox'
                    />
                ))}
            </div>
        </div>
    )
}
export default ConverterOptions