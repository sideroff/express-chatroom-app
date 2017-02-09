const User = require('mongoose').model('User')
const Room = require('mongoose').model('Room')
const maxNumberOfMessages = 3
let rooms = {}
// socket id => {User model, Room model}
let currentUsers = {}

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
                currentUsers[socket.id] = {user: user, room: room}
                if (!rooms[room]) {
                    rooms[room] = {messages: []}
                }
                socket.emit('accepted')
                socket.on('msg', (msg) => {
                    let date = msg.date || Date.now()
                    let room = currentUsers[socket.id].room
                    let messeges = rooms[room].messages
                    messeges.push({
                        author: currentUsers[socket.id].user._id,
                        text: msg.text,
                        date: date
                    })
                    // // sending to all clients in 'game' room(channel) except sender
                    // socket.broadcast.to('game').emit('message', 'nice game');
                    socket.broadcast.emit('newMsg',{
                        author: currentUsers[socket.id].user.username,
                        text: msg.text,
                        date: date
                    })
                    if (messeges.length >= maxNumberOfMessages){
                        // another var because next few lines are async
                        let messegesForDb = messeges
                        messeges = []
                        Room.update({_id: room._id},{$push: {messages: {$each: messegesForDb}}}).then((result) => {
                            console.log(result)
                        })
                    }
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