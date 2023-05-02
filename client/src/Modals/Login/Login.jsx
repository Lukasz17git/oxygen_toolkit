import axios from 'redaxios'
import { loginUri, authOptions } from '../../Data/uris'
import text from './text'
import { useLanguage } from '../../Hooks/useLanguage'
import ModalContainer from '../ModalContainer'
import InputsWrapper from '../../Components/InputsWrapper'
import Input from '../../Components/Input'
import Submit from '../../Components/Submit'
import { update } from '../../Store/rootReducers'
import { spread } from 'maraj'

const Login = ({ closeModal, getModalData, modalDataPath, dispatchErrorWrappedThunk }) => {

   const translatedText = useLanguage(text)

   const submit = e => {
      e.preventDefault()
      dispatchErrorWrappedThunk(async (dispatch, getState) => {
         const modalData = getModalData(getState)
         const { data } = await axios.post(loginUri, modalData, authOptions())
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
            <InputsWrapper label={translatedText.mainLabel}>
               <Input storePath={modalDataPath} id='email' required={true} />
               <Input storePath={modalDataPath} id='password' required={true} />
            </InputsWrapper>
            <Submit text={translatedText.submit} />
         </form>
      </ModalContainer>
   )
}

export default Login