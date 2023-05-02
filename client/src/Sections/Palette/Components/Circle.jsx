import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../../Store/store"
import { setValue } from "../../../Store/rootReducers"


const Circle = ({ index }) => {

    const color = useTypedSelector(state => state.palette.currentPalette.colors[index])
    const isCurrentCircleSelected = useTypedSelector(state => state.palette.selectedCircleIndex === index)

    const dispatch = useDispatch()
    const selectCircleIndex = () => dispatch(setValue('palette.selectedCircleIndex', index))

    return (
        <button
            className="i"
            onClick={selectCircleIndex}
            style={{
                backgroundColor: '#' + color,
                ...isCurrentCircleSelected && { transform: 'scale(1.3)' }
            }}
        />
    )
}

export default Circle