import { useTypedSelector } from "../Store/store"
import { setValue } from "../Store/rootReducers"
import { initialModal } from "../Store/InitialStates/initialModal"
import { modals } from "./modals"
import useDispatchErrorWrappedThunk from "../Hooks/useDispatchErrorWrappedThunk"


const Modal = () => {
  const modalId = useTypedSelector(state => state.modal.id) || null
  const ActiveModal = modalId && modals[modalId]

  const { dispatchErrorWrappedThunk, dispatch } = useDispatchErrorWrappedThunk()

  const closeModal = () => dispatch(setValue('modal', initialModal))
  const getModalData = (getState) => getState().modal.data

  return ActiveModal && <ActiveModal
    closeModal={closeModal}
    modalDataPath={'modal.data'}
    getModalData={getModalData}
    dispatchErrorWrappedThunk={dispatchErrorWrappedThunk}
  />
}
export default Modal