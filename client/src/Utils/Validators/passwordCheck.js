
const passwordCheck = (password) => {
    if (typeof password !== 'string') return false
    if (password.length < 5 || password.length > 30) return false
    return true
}

export default passwordCheck