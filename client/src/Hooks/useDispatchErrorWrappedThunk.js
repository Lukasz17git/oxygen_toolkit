import { useDispatch } from "react-redux"
import handleError from "../Errors/handleError"

const useDispatchErrorWrappedThunk = () => {

    const dispatch = useDispatch()
    const dispatchErrorWrappedThunk = (thunkFunction) => dispatch(async (dispatch, getState) => {
        try {
            await thunkFunction(dispatch, getState)
        } catch (error) {
            handleError(dispatch, error)
        }
    })

    return { dispatchErrorWrappedThunk, dispatch }
}

export default useDispatchErrorWrappedThunk