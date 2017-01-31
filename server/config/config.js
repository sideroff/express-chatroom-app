let path = require('path')

const rootPath = path.join(__dirname,'../../')

module.exports = {
    development: {
        rootPath: rootPath,
        port: 3000,
        dbConnectionString: 'mongodb://localhost:27017/chatroom-app'
    },
    production: {        
        rootPath: rootPath,
        port: PORT,
        dbConnectionString: process.env.DB_CONN_STR
    }
}