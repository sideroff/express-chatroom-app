let express = require('express')
let app = express()
let pug = require('pug')

let env = process.env.NODE_ENV || 'development'
let config = require('./config/config')[env]

app.set('view engine','pug')
app.set('views','/content/')
app.use(express.static('public'))

app.get('/',(req,res) => {
    let links = {
        headerLinks: [
            {href:'/', text:'Home'},
            {href:'/register', text:'Register'},
            {href:'/login', text:'Login'}]}

    let html = pug.renderFile('./content/header.pug',links)
    res.send(html)
})

app.listen(config.port,() => {
    console.log('Server listening on port: ' + config.port)
})