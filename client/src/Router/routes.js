import Palette from "../Sections/Palette/Palette"
import UnitConverter from "../Sections/UnitConverter/UnitConverter"

export const routesMap = {
    converter: UnitConverter,
    palette: Palette
}

export const routes = Object.keys(routesMap)