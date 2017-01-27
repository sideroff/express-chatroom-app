const userModel = require('../models/userModel')

module.exports = {
    login : (req,res) => {
        res.render('loginForm')
    },
    authenticate: (req,res) => {

    },
    register: (req,res) => {
        res.render('registerForm')
    },
    create: (req,res) => {
        let inputUser = req.body
        if(inputUser.password !== inputUser.confirmPassword){
            console.log('psaswords didnt match')
            res.redirect('/register')
            return
        }
        // TODO make with promise
        userModel
            .createUser(inputUser.username, inputUser.password, ['user'], function (err, createdUser) {
            
            if(err) {
                console.log(err)
                res.redirect('/register')
            }
            else {
                console.log('successfully registered user')
                res.redirect('/')
            }
        })        
    }
}