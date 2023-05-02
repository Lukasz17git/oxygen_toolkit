const { Schema, model } = require('mongoose')

const unitConversionSchema = new Schema({
    value: { type: String },
    originUnit: { type: String },
    targetUnit: { type: String },
})

const paletteSchema = new Schema({
    paletteName: { type: String },
    colors: [{ type: String, length: 6 }]
})

const userSchema = new Schema({
    username: { type: String, maxlength: 100 },
    email: { type: String, unique: true, required: true, minlength: 5, maxlength: 60, lowercase: true },
    password: { type: String },
    loginAttempts: { type: Number, default: 0 },
    lastLoginDateAttempt: { type: Date },

    conversions: [unitConversionSchema],
    palettes: [paletteSchema],
})



module.exports = model('User', userSchema)