import UnitConverter from "../Sections/UnitConverter/UnitConverter"
import { routesMap } from "./routes"
import { useTypedSelector } from "../Store/store"

const Router = () => {
    const route = useTypedSelector(state => state.route)
    const SelectedRoute = routesMap[route] ?? UnitConverter
    return (
        <SelectedRoute />
    )
}
export default Router