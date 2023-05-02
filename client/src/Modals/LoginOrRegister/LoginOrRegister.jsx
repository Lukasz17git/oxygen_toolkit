import { useDispatch } from "react-redux"
import { useLanguage } from "../../Hooks/useLanguage"
import text from "./text"
import ModalContainer from "../ModalContainer"
import ButtonsWrapper from "../../Components/ButtonsWrapper"
import Button from "../../Components/Button"
import { openLogin, openRegister } from '../../Store/Reducers/openModal'


const LoginOrRegister = ({ closeModal }) => {

    const translatedText = useLanguage(text)

    const dispatch = useDispatch()
    const openLoginModal = () => dispatch(openLogin())
    const openRegisterModal = () => dispatch(openRegister())

    return (
        <ModalContainer closeModal={closeModal} title={translatedText.title}>
            <div className='modal-form'>
                <ButtonsWrapper label={translatedText.mainLabel}>
                    <Button text={translatedText.login} handler={openLoginModal} className="button-app-secondary" />
                    <Button text={translatedText.register} handler={openRegisterModal} />
                </ButtonsWrapper>
            </div>
        </ModalContainer>
    )
}
export default LoginOrRegister