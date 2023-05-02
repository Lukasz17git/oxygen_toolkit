

import ModalContainer from "../ModalContainer"
import ButtonsWrapper from '../../Components/ButtonsWrapper'
import Button, { CancelButton } from '../../Components/Button'
import text from "./text"
import { useLanguage } from "../../Hooks/useLanguage"
import { authOptions, logoutUri } from "../../Data/uris"
import axios from 'redaxios'
import { resetStore } from "../../Store/rootReducers"
import { clearLocalStore } from "../../Utils/LocalStore/localStore"


const Logout = ({ closeModal, dispatchErrorWrappedThunk }) => {

   const translatedText = useLanguage(text)

   const submit = () => {
      dispatchErrorWrappedThunk(async (dispatch) => {
         await axios.get(logoutUri, authOptions())
         clearLocalStore()
         dispatch(resetStore())
      })
   }

   return (
      <ModalContainer closeModal={closeModal} title={translatedText.title}>
         <div className='modal-form'>
            <ButtonsWrapper label={translatedText.mainLabel}>
               <CancelButton handler={closeModal} className="button-app-secondary" />
               <Button text={translatedText.submit} handler={submit} />
            </ButtonsWrapper>
         </div>
      </ModalContainer>
   )
}
export default Logout