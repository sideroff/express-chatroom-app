let path = require('path')
let pug = require('pug')

let controllers = require('../controllers')




module.exports = (config, app) => {
    
    app.get('/',controllers.home.index)
    app.get('/login', controllers.users.login)

    app.get('*', (req,res) => {
        console.log('all')
        res.send('Page not found!')
        res.end()
    })
}