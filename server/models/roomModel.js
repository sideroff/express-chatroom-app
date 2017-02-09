const mongoose = require('mongoose')
const UserSchema = require('mongoose').model('User')
let Schema = mongoose.Schema

let requiredValidationMsg = '{PATH} is required!'

let roomSchema = new Schema({
    name: {type: String, required: requiredValidationMsg},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: requiredValidationMsg},
    messages: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: requiredValidationMsg},
        text: {type: String, required: requiredValidationMsg},
        date: {type: Date, default: Date.now()}
}]

})

let Room = mongoose.model('Room', roomSchema)