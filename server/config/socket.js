const User = require('mongoose').model('User')
const Room = require('mongoose').model('Room')

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
                    
                    Room.update({_id: room._id},{$push: {messages: newMsg}}).then((result) => {
                        console.log(result)
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