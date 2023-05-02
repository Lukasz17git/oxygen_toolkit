const User = require("../DbModels/User")
const { fieldErrors } = require("../Error/errorList")
const { notFoundError } = require("../Error/generateError")
const { generateProjectionObject } = require("../Utils/mongoUtils")


const DB_updateUser = (userID, updateData, returnData = true) => new Promise((resolve, reject) => {
    const query = { _id: userID }
    const projection = returnData ? generateProjectionObject(updateData) : { _id: 1 }
    const toUpdate = { $set: updateData }
    const toReturn = { new: true, projection }
    User.findOneAndUpdate(query, toUpdate, toReturn).exec()
        .then(response => response ? resolve(response) : reject(notFoundError(fieldErrors.user)))
        .catch(error => reject(error))
})


module.exports = { DB_updateUser }