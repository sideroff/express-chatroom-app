module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(socket.id + ' has connected')
        
        socket.on('data', (data) => {
        console.log(data)
        })
        socket.on('disconnect', (socket) => {
        console.log(socket.id + ' has disconnected')
        })
    })
    
}