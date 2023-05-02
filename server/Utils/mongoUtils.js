
const generateProjectionObject = (object) => {
    const projection = { ...object }
    Object.keys(projection).map(key => projection[key] = true)
    projection._id = true
    return projection
}

module.exports = { generateProjectionObject }