import { useLanguage } from "../../../Hooks/useLanguage"
import FlipButton from "../Components/FlipButton"
import LikeButton from "../Components/LikeButton"
import Result from "../Components/Result"
import ConverterSelect from "../Components/ConverterSelect"
import text from "../text"
import Input from '../../../Components/Input'

const ConverterCalculator = () => {

    const { title } = useLanguage(text)

    return (
        <div className="converter-calculator-container">
            <div className="converter-calculator-header">
                <h3>{title}</h3>
                <LikeButton />
            </div>
            <div className="converter-calculator-inputs">
                <Input storePath='converter' id='converterInput' className="converter-input" />
                <FlipButton />
                <ConverterSelect />
            </div>
            <Result />
        </div>
    )
}


export default ConverterCalculator