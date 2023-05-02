import { spread } from "maraj"
import { addPaletteUri, authOptions } from "../../../Data/uris"
import useDispatchErrorWrappedThunk from "../../../Hooks/useDispatchErrorWrappedThunk"
import { initialColor } from "../../../Store/InitialStates/initialPalette"
import { update } from "../../../Store/rootReducers"
import { useTypedSelector } from "../../../Store/store"
import { savePalettesToLocalStore } from "../../../Utils/LocalStore/localStore"
import isRunningLocally from "../../../Utils/isRunningLocally"
import axios from 'redaxios'

const AddPalette = () => {

    const isValidPaletteName = useTypedSelector(state => !!state.palette.currentPalette.paletteName)

    const { dispatchErrorWrappedThunk } = useDispatchErrorWrappedThunk()
    const addPalette = () => {
        if (!isValidPaletteName) return
        dispatchErrorWrappedThunk(async (dispatch, getState) => {
            let newPalette = getState().palette.currentPalette
            if (!isRunningLocally && getState().user._id) {
                const { data } = await axios.post(addPaletteUri, newPalette, authOptions())
                newPalette = data.palettes[0]
            }
            dispatch(update({
                ['palette.selectedCircleIndex']: 0,
                ['palette.currentPalette.paletteName']: '',
                ['palette.currentPalette.colors']: [initialColor],
                ['palette.savedPalettes']: spread([newPalette]),
            }))
            await savePalettesToLocalStore(getState().palette.savedPalettes)
        })
    }

    return (
        <button className="i" onClick={addPalette}>
            <img className="i-add-palette" src="/Icons/add.svg" loading="lazy" alt="add-palette" />
        </button>
    )
}

export default AddPalette