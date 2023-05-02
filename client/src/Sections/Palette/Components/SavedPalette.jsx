import { spread } from "maraj"
import { authOptions, deletePaletteUri } from "../../../Data/uris"
import useDispatchErrorWrappedThunk from "../../../Hooks/useDispatchErrorWrappedThunk"
import { removeValue, update } from "../../../Store/rootReducers"
import { useTypedSelector } from "../../../Store/store"
import { savePalettesToLocalStore } from "../../../Utils/LocalStore/localStore"
import isRunningLocally from "../../../Utils/isRunningLocally"
import axios from 'redaxios'

const SavedPalette = ({ index }) => {
    const { colors, paletteName, _id } = useTypedSelector(state => state.palette.savedPalettes[index])

    const { dispatch, dispatchErrorWrappedThunk } = useDispatchErrorWrappedThunk()

    const selectPalette = () => dispatch(update({
        ['palette.selectedCircleIndex']: 0,
        ['palette.currentPalette']: spread({ paletteName, colors }),
    }))

    const deletePalette = () => dispatchErrorWrappedThunk(async (dispatch, getState) => {
        let indexToRemove = index
        if (!isRunningLocally && getState().user._id) {
            await axios.post(deletePaletteUri, { _id }, authOptions())
            const indexAfterUpdate = getState().palette.savedPalettes.findIndex(palette => palette._id === _id)
            indexToRemove = indexAfterUpdate
        }
        dispatch(removeValue('palette.savedPalettes', indexToRemove))
        const savedPalettes = getState().palette.savedPalettes
        await savePalettesToLocalStore(savedPalettes)
    })

    return (
        <div className="palette-saved-component">
            <b>{paletteName}</b>
            <button className="i" onClick={deletePalette}>
                <img className="i-bin" src="/Icons/bin.svg" alt="delete" loading="lazy" />
            </button>
            <button onClick={selectPalette} aria-label="palette">
                {colors.map((color, index) => (
                    <div key={index} style={{ backgroundColor: "#" + color }} />
                ))}
            </button>
        </div>
    )
}
export default SavedPalette