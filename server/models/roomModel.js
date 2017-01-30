const mongoose = require('mongoose')
let Schema = mongoose.Schema

let requiredValidationMsg = '{PATH} is required!'

let roomSchema = new Schema({
    name: {type: String, required: requiredValidationMsg},
    author: {type: String, required: requiredValidationMsg},
    messages: [{
        author: {type: String, required: requiredValidationMsg},
        text: {type: String, required: requiredValidationMsg},
        dateSent: {type: Date, default: Date.now()}
}]

})

let Room = mongoose.model('Room', roomSchema)