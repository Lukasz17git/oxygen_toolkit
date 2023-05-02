import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../../Store/store"
import { openLoginOrRegister, openSettings } from "../../../Store/Reducers/openModal"

const UserIcon = () => {

    const isUserLoggedIn = useTypedSelector(state => state.user._id)

    const dispatch = useDispatch()
    const handler = () => dispatch(isUserLoggedIn ? openSettings() : openLoginOrRegister())

    return (
        <button onClick={handler} className='i' aria-label="user">
            <img className={`i-user`} src={`/CriticalIcons/user.svg`} alt='user' loading="lazy" />
        </button>
    )
}
export default UserIcon