let path = require('path')

const rootPath = path.join(__dirname,'../../')

let remoteDbUsername = 'chatroomUser'
let remoteDbPassword = 'chatroomPassword'

module.exports = {
    development: {
        rootPath: rootPath,
        port: 3000,
        dbConnectionString: 'mongodb://localhost:27017/chatroom-app'        
        //dbConnectionString: 'mongodb://' + remoteDbUsername + ':' + remoteDbPassword + '@ds035503.mlab.com:35503/chatroom'
    },
    production: {        
        rootPath: rootPath,
        port: process.env.PORT,
		remoteDbUsername: remoteDbUsername,
		remoteDbPassword: remoteDbPassword,
        dbConnectionString: 'mongodb://' + remoteDbUsername + ':' + remoteDbPassword + '@ds035503.mlab.com:35503/chatroom'
    }
}