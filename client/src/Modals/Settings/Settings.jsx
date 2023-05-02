import ModalContainer from "../ModalContainer"
import Field from "../../Components/Field"
import { useLanguage } from "../../Hooks/useLanguage"
import text from "./text"
import { useDispatch } from "react-redux"
import { openLogout } from "../../Store/Reducers/openModal"

const Settings = ({ closeModal, modalDataPath }) => {

    const translatedText = useLanguage(text)
    const dispatch = useDispatch()
    const logout = () => dispatch(openLogout())

    return (
        <ModalContainer closeModal={closeModal} title={translatedText.title}>
            <div className='modal-form'>
                <button className="modal-tiny-button" onClick={logout}>
                    {translatedText.logout}
                </button>
                <Field storePath={modalDataPath} id='username' />
                <Field storePath={modalDataPath} id='email' />
                <Field storePath='converter.savedConversions' id='length' placeholder={translatedText.conversionsLength} />
                <Field storePath='palette.savedPalettes' id='length' placeholder={translatedText.palettesLength} />
            </div>
        </ModalContainer>
    )
}
export default Settings