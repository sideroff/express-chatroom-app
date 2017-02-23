const User = require('mongoose').model('User')
const Room = require('mongoose').model('Room')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(socket.id + ' has connected')
        
        socket.on('join', (data) => {  

            var promises = [
                User.findOne({_id: data.userId}).exec(),
                Room.findOne({_id: data.roomId}).exec()
            ]

            Promise.all(promises).then((results) => {
                let user = results[0]
                let room = results[1]
                if(!user || !room){
                    socket.emit('rejected',{reason: 'Incorrect user or room info.'})
                    socket.disconnect()
                    return
                }
                socket.join(room.name)
                socket.emit('accepted')
                socket.on('msg', (msg) => {
                    let date = msg.date || Date.now()
                    newMsg = {
                        author: user._id,
                        text: msg.text,
                        date: date
                    }
                    socket.broadcast.to(room.name).emit('newMsg',{
                        author: user.username,
                        text: msg.text,
                        date: date
                    })
                    // we need to prepend new messages so they are ordered by date by default
                    // also this ordering allows for faster queries because the majority of queries
                    // will be for the most recent messages
                    // http://stackoverflow.com/questions/10131957/can-you-have-mongo-push-prepend-instead-of-append
                    Room.update({_id: room._id},{$push: {
                        messages: { 
                            $each: [ newMsg ],
                            $position: 0
                        }
                    }}).then((result) => {
                        console.log(result)
                    })
                })
                socket.on('loadPrevious', options => {
                    console.log(options)
                    console.log(typeof(options.loadBefore))
                    let date = new Date(options.loadBefore)
                    console.log(date)
                    // very nice query C:
                    // this works because we prepend every new msg 
                    // ref: socket.on('msg', (msg) => {...}
                    Room.aggregate([
                        {$match: {"_id": new ObjectId(options.roomId)}},
                        {$unwind : "$messages"},
                        {$match: {'messages.date': {$lt: date}}},
                        {$limit: options.count},
                        {$lookup: {
                            from: "users",
                            localField: "messages.author",
                            foreignField: "_id",
                            as: "messages.author"
                            }
                        },
                        {$project: {'messages.date': 1, 'messages.text': 1, 'messages.author': '$messages.author.username'}},                        
                        {$group: {_id: '$_id', messages: { $push:  '$messages' }}}
                    ]).then(result => {
                        console.dir(result)
                        socket.emit('loadedPrevious', result)
                    })
                })
            }).catch(err => {
                console.log('error   ',err)
                socket.emit('rejected',{reason: 'Something went wrong on our side :/'})
                socket.disconnect()
                return
            })
            

        })
        socket.on('disconnect', (socket) => {
            console.log(socket.id + ' has disconnected')
        })
    })
    
}

function insertMessages(currentConnections) {

}