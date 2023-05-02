import PaletteGenerator from "./Sections/PaletteGenerator"
import SavedPalettes from "./Sections/SavedPalettes"

const Palette = () => {
  return (
    <section>
      <PaletteGenerator />
      <SavedPalettes />
    </section>
  )
}
export default Palette