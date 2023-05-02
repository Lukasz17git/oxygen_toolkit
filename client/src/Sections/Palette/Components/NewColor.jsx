import { useDispatch } from "react-redux"
import { update } from "../../../Store/rootReducers"
import { spread } from "maraj"
import { initialColor } from "../../../Store/InitialStates/initialPalette"


const NewColor = () => {

  const dispatch = useDispatch()
  const addNewColor = () => dispatch(update({
    ['palette.currentPalette.colors']: spread([initialColor]),
    ['palette.selectedCircleIndex']: current => current + 1,
  }))

  return (
    <button className='i palette-generator-colors-add' onClick={addNewColor} aria-label="new-color">
      <img src="/Icons/add.svg" loading="lazy" alt="new-color" />
    </button>
  )
}

export default NewColor