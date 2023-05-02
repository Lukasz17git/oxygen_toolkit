import ConverterCalculator from "./Sections/ConverterCalculator"
import ConverterOptions from "./Sections/ConverterOptions"
import SavedList from "./Sections/SavedList"

const UnitConverter = () => {
    return (
        <section>
            <ConverterCalculator />
            <ConverterOptions />
            <SavedList />
        </section>
    )
}
export default UnitConverter