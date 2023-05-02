import { authOptions, registerUri } from "../../Data/uris"
import axios from 'redaxios'
import { update } from "../../Store/rootReducers"
import ModalContainer from "../ModalContainer"
import { useLanguage } from "../../Hooks/useLanguage"
import text from "./text"
import Submit from "../../Components/Submit"
import InputsWrapper from "../../Components/InputsWrapper"
import Input from "../../Components/Input"
import Passwords from "./Components/Passwords"
import { spread } from "maraj"

const Register = ({ closeModal, getModalData, modalDataPath, dispatchErrorWrappedThunk }) => {

    const translatedText = useLanguage(text)

    const submit = e => {
        e.preventDefault()
        dispatchErrorWrappedThunk(async (dispatch, getState) => {
            const modalData = getModalData(getState)
            const { data } = await axios.post(registerUri, modalData, authOptions())
            const { conversions, palettes, ...user } = data
            dispatch(update({
                user: spread(user),
                ['converter.savedConversions']: conversions,
                ['palette.savedPalettes']: palettes,
            }))
            closeModal()
        })
    }

    return (
        <ModalContainer closeModal={closeModal} title={translatedText.title}>
            <form onSubmit={submit} className='modal-form'>
                <InputsWrapper label={translatedText.mainLabel} isOrientationColumn={false}>
                    <Input storePath={modalDataPath} id='email' required={true} width={18} />
                    <Input storePath={modalDataPath} id='username' required={true} width={14} />
                </InputsWrapper>
                <InputsWrapper label={translatedText.passwordsLabel} isOrientationColumn={false}>
                    <Passwords storePath={modalDataPath} />
                </InputsWrapper>
                <Submit text={translatedText.submit} />
            </form>
        </ModalContainer>
    )
}

export default Register