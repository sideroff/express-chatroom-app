let mongoose = require('mongoose')


mongoose.Promise = global.Promise

module.exports = (config) => {
    mongoose.connect(config.dbConnectionString)

    let db = mongoose.connection

    db.once('open', err => {
        if (err) {
            console.log(err)
        }

        console.log('MongoDB ready!')
    })

    db.on('error', err => {
        console.log(err)
    })
    
    // these should be in this specific order!
    // roomModel relies on there being a user model defined
    require('../models/userModel').seedAdminUser()
    require('../models/roomModel')
}