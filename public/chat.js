$(document).ready(function() {
    let username = $('#userGreeting').text()
    let socket = io(window.location.origin)

    let userId = $('#msgForm').attr('data-userId') 
    let roomId = $('#msgForm').attr('data-roomId')

    socket.emit('join', {userId: userId, roomId: roomId})
    socket.on('accepted', () => {
        console.log('been accepted')
        attachSendEvent(socket)
        socket.on('newMsg', newMsg => {
            let li = $('<li>').text(moment(newMsg.date).format('HH:mm:ss') + ' | ' + newMsg.author + ': ' + newMsg.text)
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
            let li = $('<li>').text(moment(date).format('HH:mm:ss') + ' | '+ username +': ' + text)
            $('#chat').append(li)
            $('#msgField').val('')
            socket.emit('msg',{date: date, text: text})
        })
    }
})