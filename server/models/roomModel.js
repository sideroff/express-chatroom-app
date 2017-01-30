const mongoose = require('mongoose')
let Schema = mongoose.Schema

let requiredValidationMsg = '{PATH} is required!'

let roomSchema = new Schema({
    name: {type: String, required: requiredValidationMsg},
    author: {type: String, required: requiredValidationMsg}
})

let Room = mongoose.model('Room', roomSchema)