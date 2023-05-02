
const emailCheck = (email) => {
    if (typeof email !== 'string') return false
    if (!email.includes('@')) return false
    if (email.length < 5) return false
    if (email.length > 60) return false
    return true
}

export default emailCheck