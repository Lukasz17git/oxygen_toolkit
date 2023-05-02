import Input from "../../../Components/Input"
import { useLanguage } from "../../../Hooks/useLanguage"
import { useTypedSelector } from "../../../Store/store"
import AddPalette from "../Components/AddPalette"
import Circle from "../Components/Circle"
import ColorPicker from "../Components/ColorPicker"
import NewColor from "../Components/NewColor"
import text from "../text"



const PaletteGenerator = () => {

   const { title } = useLanguage(text)

   const colorsLength = useTypedSelector(state => state.palette.currentPalette.colors.length)
   const colorsArray = Array(colorsLength).fill()

   return (
      <div className="palette-generator-container">
         <h2>{title}</h2>
         <div className="palette-generator-colors">
            {colorsArray.map((_, index) => (
               <Circle key={index} index={index} />
            ))}
            {colorsLength < 5 && <NewColor />}
         </div>
         <div className="palette-generator-inputs">
            <ColorPicker />
            <div>
               <Input className="palette-input" storePath='palette.currentPalette' id="paletteName" width={16} />
               <AddPalette />
            </div>
         </div>
      </div>
   )
}
export default PaletteGenerator