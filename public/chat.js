$(document).ready(function() {
    let hasMessagesAfter = Date.now()
    // have some way for the user to alter this
    let numberOfMessagesToLoad = 10

    let username = $('#userGreeting').text()
    let socket = io(window.location.origin)

    let userId = $('#msgForm').attr('data-userId') 
    let roomId = $('#msgForm').attr('data-roomId')

    socket.emit('join', {userId: userId, roomId: roomId})
    socket.on('accepted', () => {
        attachSendEvent(socket)
        attachLoadPreviousMessagesEvent(socket)
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
    
    function attachLoadPreviousMessagesEvent(socket) {
        $('#loadPreviousBtn').on('click', function() {
            socket.emit('loadPrevious', {
                roomId: roomId, 
                loadBefore: hasMessagesAfter, 
                count: numberOfMessagesToLoad })
        })
        socket.on('loadedPrevious', data => {
            console.dir(data)
        })
    }
})