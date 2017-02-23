let Room = require('mongoose').model('Room')
const defaultNumberOfMessagesLoadedWhenJoining = 0
module.exports = {
    index: (req, res) => {

        Room.find({},function (err, rooms) {
            if (err) {
                req.flash('error','Something went wrong when getting data from the server. :(')
                res.redirect('/')
                return
            }

            res.locals.rooms = rooms            
            res.render('rooms')
        })
    },
    create: (req, res) => {

        Room.create({
            name: req.body.name,
            author: req.user._id
        }, function(err, room) {
            if (err) {
                if (err.name == 'MongoError' && err.code == 11000) {
                    req.flash('error','A room with this name already exists!')
                } 
                else {
                    req.flash('error','FIXME roomController: ' + err.message)
                }

                res.redirect('/rooms/create')
                return            
            }

            req.flash('success','Room "' + room.name + '" has been created successfully!')

            res.redirect('/rooms')
        })

    },
    join: (req, res, io) => {
        Room.findOne({name: req.params.roomName},{messages: {$slice: defaultNumberOfMessagesLoadedWhenJoining}}).populate('author').exec(function (err, room) {            
            if (err) {
                req.flash('error','Something went wrong when accessing room, please try again.')
                res.redirect('/rooms')
                return
            }
            if(!room) {
                req.flash('error','No room with such name exists. Why not create it?')
                res.redirect('/rooms')
                return
            }
            req.flash('success','Successfully joined room ' + room.name + '.')
            res.locals.room = room
            res.render('showRoom')
        })
    },
    
}