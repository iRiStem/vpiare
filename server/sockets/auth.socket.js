
const authConnection = (io, socket, authVk, user) => {

  const userLogin = (data) => {
    user.findOne(data.user_id, function(result){
      data.status = result ? 'update' : 'create'
      if (result) user.update(data,function(result_up){})
      else user.create(data, function(result_create){})
      socket.emit('login', data)
    })
  }

  const getUserInfo = (data) => {
    authVk.user_id = data.user_id
    authVk.access_token = data.access_token
    authVk.getUserInfo(function(result) {
      if (!result) {
        socket.emit('logout')
      }
      if (result) {
        userLogin(Object.assign(data, result))
      }
    })
  }


  socket.on('get_access_token', async (code) => {
    authVk.code = code
    authVk.getAccessToken(function(result) {
      getUserInfo(result)
    })
  })


  socket.on('get_user_info', async (data) => {
    user.findOne(data, function(result){
      if (result) {
        data = { user_id: result.vkId, access_token: result.user_token }
        getUserInfo(data)
      }
    })
  })


  socket.on('test_server', () => {
    socket.emit('send_test_server', 'server work')
  })


}
module.exports = { authConnection }