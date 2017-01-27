let path = require('path')
let express = require('express')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let session = require('express-session')
let passport = require('passport')

module.exports = (config, app) => {
    app.set('view engine','pug')
    app.set('views',path.join(config.rootPath, '/server/views'))
    
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({ extended: true}))
    app.use(session({
        secret: 'change-me!@#%', 
        resave: false, 
        saveUninitialized: false}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(express.static(path.join(config.rootPath, 'public')))
}
