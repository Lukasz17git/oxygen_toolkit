const capitalizeWords = (name) => {
    if (!name) return name
    const words = name.split(' ')
    const capitalizedWords = words.map(word => word && (word[0].toUpperCase() + word.slice(1)))
    return capitalizedWords.join(' ')
}
export default capitalizeWords