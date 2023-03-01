



const authConnection = (io, socket) => {
  socket.on('test_server', (data) => {
    console.log(data)
    socket.emit('send_test_server', 'server work')
  })

}
module.exports = { authConnection }