import { fieldErrors, locationErrors, typeErrors } from "../../Errors/errorList"
import { setNewError } from "../../Errors/handleError"
import { modalIDs } from "../../Modals/modals"
import { setValue } from "../rootReducers"

const openModal = (modalID, data) => {
    if (!modalIDs.includes(modalID)) return setNewError(locationErrors.app, fieldErrors.modal, typeErrors.invalid)
    const modal = data ? { id: modalID, data } : { id: modalID, data: null }
    return setValue('modal', modal)
}


export const openLoginOrRegister = () => openModal('loginOrRegister')

export const openRegister = () => (dispatch, getState) => dispatch(openModal('register', getState().user))

export const openLogin = () => (dispatch, getState) => dispatch(openModal('login', getState().user))

export const openSettings = () => (dispatch, getState) => dispatch(openModal('settings', getState().user))

export const openLogout = () => openModal('logout')