const numberFormatter = (value, numberOfMaxDecimals = 2) => {
    if (typeof value !== "string") return ""
    if (!value) return ""
    let formattedValue = value.replace(',', '.')
    const comma = formattedValue.indexOf('.')
    if (comma === -1) return formattedValue.replace(/[^\d]/g, '')
    const left = formattedValue.slice(0, comma)
    const right = formattedValue.slice(comma + 1)
    formattedValue = `${left.replace(/[^\d]/g, '') || 0}.${right.replace(/[^\d]/g, '').slice(0, numberOfMaxDecimals)}`
    return formattedValue
}

export default numberFormatter