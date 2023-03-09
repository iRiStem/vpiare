const ApiVK = require('../api/auth.vk')
const User = require('../data/models/User')

let authVk = new ApiVK()
let user = new User()

const authConnection = (io, socket) => {
  socket.on('test_server', (data) => {
    socket.emit('send_test_server', 'server work')
  })


  socket.on('access_token', async (data) => {
    authVk.code = data
    authVk.getAccessToken(function(result) {
      console.log('getAccessToken', result)

      socket.emit('access_token', result)
    })
  })

  socket.on('auth_user', async (data) => {
    authVk.user_id = data.user_id
    authVk.access_token = data.access_token
    authVk.getUserInfo(function(result) {
      socket.emit('auth_user', result ? Object.assign(data, result) : result)

      //if (result) return res.status(200).json({message: 'AUTH VK', data: result})
    })

  })

  socket.on('user_login', async (data) => {

    user.findOne(data.user_id, function(result){
      if (result) user.update(data,function(result_up){
        socket.emit('user_login', 'update')
      })
      else user.create(data, function(result_create){
        socket.emit('user_login', 'create')
      })
    })
  })


  socket.on('get_user', async (data) => {
    user.findOne(data, function(result){
      if (result) {
        data = { user_id: result.vkId, access_token: result.user_token }
      }
      socket.emit('access_token', data ? data : null)
    })
  })




}
module.exports = { authConnection }