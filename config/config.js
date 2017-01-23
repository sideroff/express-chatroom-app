module.exports = {
    development: {
        port: 3000,
        dbConnectionString: ''
    },
    production: {
        port: process.env.port,
        dbConnectionString: process.env.DB_CONN_STR
    }
}