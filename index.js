let express = require('express')
let app = express()

let env = process.env.NODE_ENV || 'development'
let config = require('./config/config')[env]
require('./config/express')(config,app)
require('./config/routes')(config,app)


app.listen(config.port,() => {
    console.log('Server listening on port: ' + config.port)
})