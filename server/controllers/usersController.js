const User = require('mongoose').model('User')
const encryption = require('../utilities/encryption')
const PopUpCollection = require('../utilities/popUps').PopUpCollection

module.exports = {
    login : (req,res) => {
        res.render('loginForm')
    },
    authenticate: (req,res) => {
        req.logIn(user)
    },
    register: (req,res) => {
        let messages = req.session.messages
        req.session.messages = null    
        res.render('registerForm',{messages: messages})
    },
    create: (req,res) => {
        let popUpCollection = new PopUpCollection()
        let inputUser = req.body
        if(inputUser.password !== inputUser.confirmPassword){
            popUpCollection.addError('Passwords did not match!!')
            req.session.messages = popUpCollection.messages
            res.redirect('/register')
            return
        }
        let salt = encryption.generateSalt()
        let passwordHash = encryption.generatePasswordHash(salt, inputUser.password)
        User.create({
            username: inputUser.username,
            passwordHash: passwordHash,
            salt: salt,
            dateRegistered: Date.now()
        }, function (err,user) {
            if(err) {
                if (err.name == 'MongoError' && err.code == 11000) {
                    popUpCollection.addError('A user with this username already exists!')
                } 
                else {
                    popUpCollection.addError('FIXME userscontroller: ' + err.message)
                }
                req.session.messages = popUpCollection.messages
                res.redirect('/register')
                return
            }

            popUpCollection.addSuccess('Successfully registered user!')
            req.session.messages = popUpCollection.messages
            res.redirect('/')
        })     
    }
}