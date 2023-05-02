
const repeatPasswordCheck = (repeatedPassword, dispatch) => {
    if (typeof repeatedPassword !== 'string') return false
    if (repeatedPassword.length < 5 || repeatedPassword.length > 30) return false
    const password = dispatch((_, getState) => getState().modal.data.password)
    if (repeatedPassword !== password) return false
    return true
}

export default repeatPasswordCheck