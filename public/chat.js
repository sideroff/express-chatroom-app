window.onload = function() {
    let socket = io('http://localhost:3000')
    socket.emit('data',{text: 'hello'})
    socket.on('data', function (data) {
        console.log(data)
    })
}