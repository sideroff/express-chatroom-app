const userModel = require('../models/userModel')
const PopUpCollection = require('../utilities/popUps').PopUpCollection

module.exports = {
    login : (req,res) => {
        res.render('loginForm')
    },
    authenticate: (req,res) => {

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
        //TODO: make with promise
        userModel
            .createUser(inputUser.username, inputUser.password, ['user'], function (err, createdUser) {
            
            if(err) {
                console.log(err)
                res.render('/register')
            }
            else {
                console.log('successfully registered user')
                res.render('/', popUps.info('Successfully registered!'))
            }
        })        
    }
}