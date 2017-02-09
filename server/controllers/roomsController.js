let Room = require('mongoose').model('Room')
let PopUpCollection = require('../utilities/popUps').PopUpCollection

module.exports = {
    rooms: (req, res) => {
        let popUps = new PopUpCollection()

        Room.find({},function (err, rooms) {
            if (err) {
                console.log('err getting rooms from db in roomscontroller ', err)
                popUps.addError('Something went wrong when getting data from the server. :(')
                req.session.messages = popUps.messages
                res.redirect('/')
                return
            }
            console.log('got ' + rooms.length + ' rooms')
            res.locals.rooms = rooms
            
            let messages = req.session.messages
            req.session.messages = null
            res.render('rooms', {messages: messages})
        })
    },
    create: (req, res) => {
        let popUps = new PopUpCollection()

        Room.create({
            name: req.body.name,
            author: req.user._id
        }, function(err, room) {
            if (err) {
                if (err.name == 'MongoError' && err.code == 11000) {
                    popUps.addError('A room with this name already exists!')
                } 
                else {
                    popUps.addError('FIXME roomController: ' + err.message)
                }

                req.session.messages = popUps.messages
                res.redirect('/rooms/create')
                return            
            }

            popUps.addSuccess('Room "' + room.name + '" has been created successfully!')

            req.session.messages = popUps.messages
            res.redirect('/rooms')
        })

    },
    join: (req, res, io) => {
        let popUps = new PopUpCollection()
        Room.findOne({name: req.params.roomName}).populate('author messages.author').exec(function (err, room) {            
            if (err) {
                popUps.addError('Something went wrong when accessing room, please try again.')
                req.session.messages = popUps.messages
                res.redirect('/rooms')
                return
            }
            if(!room) {
                popUps.addError('No room with such name exists. Why not create it?')
                req.session.messages = popUps.messages
                res.redirect('/rooms')
                return
            }
            popUps.addSuccess('Successfully joined room ' + room.name + '.')
            res.locals.room = room
            res.render('showRoom',{
                messages: popUps.messages
            })
        })
    }

}