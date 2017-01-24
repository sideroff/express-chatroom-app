let path = require('path')
let pug = require('pug')


let links = {
    guest: {
        headerLinks: [
            {href:'/', text:'Home'},
            {href:'/register', text:'Register'},
            {href:'/login', text:'Login'}]},
    user: { 
        headerLinks: [
            {href:'/', text:'Home'},
            {href:'/rooms', text:'All rooms'},
            {href:'/profile', text:'My Profile'}]}
}

module.exports = (config, app) => {
    app.get('/',(req,res) => {
        console.log('index')
        let pathToFile = path.join(config.rootPath,'./content/header.pug')
        res.render('header',links.guest)
    })

    app.get('/login', (req,res) => {
        res.render('loginForm',links.guest)
    })

    app.get('*', (req,res) => {
        console.log('all')
        res.send('Page not found!')
        res.end()
    })
}