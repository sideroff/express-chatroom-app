let path = require('path')
let pug = require('pug')
const authenticate = require('../middlewares/authenticate')

let controllers = require('../controllers')




module.exports = (config, app) => {
    
    app.get('/',controllers.home.index)
    app.get('/register', controllers.users.register)
    app.post('/register', controllers.users.create)
    app.get('/login', controllers.users.login)
    app.post('/login', controllers.users.authenticate)
    app.post('/logout', authenticate, controllers.users.logout)
    app.get('/rooms',authenticate, controllers.rooms.rooms)

    app.get('*', (req,res) => {
        res.send('Page not found!')
        res.end()
    })
}