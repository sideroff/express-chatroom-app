let homeController = require('./homeController')
let usersController = require('./usersController')
let roomsController = require('./roomsController')

module.exports = {
    home: homeController,
    users: usersController,
    rooms: roomsController,
}