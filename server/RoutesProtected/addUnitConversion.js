const router = require('express').Router()
const User = require('../DbModels/User')
const { locationErrors, fieldErrors } = require('../Error/errorList')
const { notFoundError } = require('../Error/generateError')
const { handleError } = require('../Error/handleError')


router.use('/', async (req, res) => {

    try {
        const { userID } = req.user
        const conversion = req.body
        // could be added some kind of validation in conversion
        const update = await DB_addUnitConversion(userID, conversion)
        console.log('update', update)
        res.send(update)
    } catch (error) {
        const handledError = handleError(error, locationErrors.conversions)
        res.status(handledError.status).send(handledError)
    }
})

module.exports = router

const DB_addUnitConversion = (userID, conversion) => new Promise((resolve, reject) => {
    const query = { _id: userID }
    const toUpdate = { $push: { conversions: conversion } }
    const toReturn = { new: true, projection: { nonExistentKey: 1, conversions: { $slice: -1 } } } //if there is no "nonexistentkey" it ll return all the user data, seems like a bug
    User.findOneAndUpdate(query, toUpdate, toReturn).exec()
    .then(response => response ? resolve(response) : reject(notFoundError(fieldErrors.user)))
    .catch(error => reject(error))
})