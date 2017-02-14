const User = require('mongoose').model('User')
const encryption = require('../utilities/encryption')
const jwt = require('jsonwebtoken')

module.exports = {
    register: (req,res) => {   
        res.render('registerForm')
    },
    create: (req,res) => {        
        let inputUser = req.body
        if(inputUser.password !== inputUser.confirmPassword){
            req.flash('error','Passwords did not match!')
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
                    req.flash('error','A user with this username already exists')
                } 
                else {
                    req.flash('error','FIXME userscontroller: ' + err.message)
                }
                res.redirect('/register')
                return
            }
            req.flash('success','Successfully registered user!')
            res.redirect('/')
        })     
    },    
    login : (req,res) => {
        res.render('loginForm')
    },
    authenticate: (req,res) => {
        let user = User.findOne({username: req.body.username})
            .then(user => {
                if(!user || !user.authenticate(req.body.password)){
                    req.flash('error','Invalid username or password!')
                    res.redirect('/login')
                    return
                }
                req.logIn(user, (err, user) => {
                    if(err) {
                        
                        req.flash('error','Oops! Something went wrong on our end :(')
                        res.redirect('/login')
                        return
                    }
                    req.flash('success','Login successful!')
                    res.redirect('/')
                })
            })
    },
    logout: (req, res) => {    
        req.logOut()
        req.flash('success', 'Logged out Successfully!')
        res.redirect('/')
    }    
}