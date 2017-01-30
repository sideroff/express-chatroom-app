const User = require('mongoose').model('User')
const encryption = require('../utilities/encryption')
const PopUpCollection = require('../utilities/popUps').PopUpCollection

module.exports = {
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
    },    
    login : (req,res) => {
        let messages = req.session.messages
        req.session.messages = null
        console.log('get login ', messages)
        res.render('loginForm', {messages: messages})
    },
    authenticate: (req,res) => {
        let popUps = new PopUpCollection()
        let user = User.findOne({username: req.body.username})
            .then(user => {
                if(!user || !user.authenticate(req.body.password)){
                    console.log('invalid credentials')
                    popUps.addError('Invalid username or password!')
                    req.session.messages = popUps.messages
                    res.redirect('/login')
                    return
                }

                req.logIn(user, (err, user) => {
                    if(err) {
                        popUps.addError('Oops, 500! ')
                        req.session.messages = popUps.messages
                        res.redirect('/login')
                        return
                    }

                    console.log('success')
                    popUps.addSuccess('Login successful! ')
                    req.session.messages = popUps.messages
                    res.redirect('/')
                })
            })
    },
    logout: (req, res) => {
        let popUps = new PopUpCollection()
    
        req.logOut()
        popUps.addSuccess('Logged out successfully!')
        
        req.session.messages = popUps.messages

        res.redirect('/')
    }
    
}