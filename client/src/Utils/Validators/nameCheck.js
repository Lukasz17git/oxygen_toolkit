

const nameCheck = (name) => {
    const regex = /[\p{L}|\s]/ug
    
    if (typeof name !== 'string') return false
    if (name.match(regex).join('') !== name) return false
    if (name.length > 40) return false
    return true
}

export default nameCheck