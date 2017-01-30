let express = require('express')
let app = express()
let server = require('http').createServer(app)
let io = require('socket.io')(server)

let env = process.env.NODE_ENV || 'development'
let config = require('./server/config/config')[env]
require('./server/config/database')(config)
require('./server/config/express')(config,app)
require('./server/config/routes')(config,app)
require('./server/config/passport')()

server.listen(config.port,() => {
    console.log('Server listening on port: ' + config.port)
})  