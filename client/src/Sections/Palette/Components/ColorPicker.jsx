import { HexColorPicker } from 'react-colorful'
import { useTypedSelector } from '../../../Store/store'
import { useDispatch } from 'react-redux'
import { setValue } from '../../../Store/rootReducers'

const ColorPicker = () => {

  const color = useTypedSelector(state => state.palette.currentPalette.colors[state.palette.selectedCircleIndex])

  const dispatch = useDispatch()
  const handleColorChange = (newColor) => dispatch((dispatch, getState) => {
    const selectedIndex = getState().palette.selectedCircleIndex
    dispatch(setValue(`palette.currentPalette.colors.${selectedIndex}`, newColor.slice(1)))
  })
  
  return (
    <HexColorPicker color={'#' + color} onChange={handleColorChange} />
  )
}
export default ColorPicker