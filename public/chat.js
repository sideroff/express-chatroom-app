window.onload = function() {
    let socket = io('http://localhost:3000')

    let userId = $('#msgForm').attr('data-userId') 
    let roomId = $('#msgForm').attr('data-roomId')

    socket.emit('join', {userId: userId, roomId: roomId})
    socket.on('accepted', () => {
        console.log('been accepted')
        attachSendEvent(socket)
        socket.on('newMsg', newMsg => {
            let li = $('<li>').text(newMsg.author + ' at ' + newMsg.date + ' | ' + newMsg.text)
            $('#chat').append(li)
        })
    })
    socket.on('rejected', (data) => {
        console.log(data)
        socket.disconnect()
    })
    socket.on('disconnect', () => {
        console.log('You got disconnected.')
    })

    function attachSendEvent(socket) {
        $('#msgForm').on('submit', (e) => {
            e.preventDefault()
            let date = Date.now()
            let text = $('#msgField').val()
            let li = $('<li>').text('You' + ' at ' + date + ' | ' + text)
            $('#chat').append(li)
            $('#msgField').val('')
            socket.emit('msg',{date: date, text: text})
        })
    }
}