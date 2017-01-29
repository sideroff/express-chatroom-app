let mongoose = require('mongoose')


let Schema = mongoose.Schema

let validationMessage = '{PATH} is required}'

let UserSchema = new Schema({
    username: {
        type: String,
        required: validationMessage,
        unique: true
    },
    passwordHash: {
        type: String,
        required: validationMessage
    },
    salt: {
        type: String,
        required: validationMessage
    },
    dateRegistered: {
        type: Date,
        default: Date.now()
    },
    roles: [String]
})

UserSchema.method({
    authenticate: function (password) {
        let inputPasswordHash = encryption.generatePasswordHash(this.salt, password)
        
        return this.passwordHash === this.inputPasswordHash
    }
})


let User = mongoose.model('User', UserSchema)

module.exports = {    
    seedAdminUser: () => {
        User.find({}).then(users => {
            if (!users || users.length == 0) {
                let salt = encryption.generateSalt
                let passwordHash = encryption.generatePasswordHash(salt,'admin')
                User.create({
                    username: 'admin',
                    passwordHash: passwordHash,
                    salt: salt,
                    roles: ['admin']
                })
            }
        })
    }
}
