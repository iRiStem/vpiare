const User = require('../data/models/User')
const GroupVK = require('../data/models/GroupVK')

const ApiGroupsVK = require('../api/groups.vk')

let user = new User()
let groupVK = new GroupVK()

let groupsVKApi = new ApiGroupsVK()


const groupsConnection = (io, socket) => {
  socket.on('get_groups', async (data) => {
    groupsVKApi.user_id = data.user_id;
    groupsVKApi.access_token = data.access_token
    groupsVKApi.getGroups(function(res) {
      socket.emit('set_groups', res ? res : [])

    })
  })

  socket.on('get_group', async (auth, id) => {
    groupsVKApi.group_id = id
    groupsVKApi.getGroupById(function(res) {
      groupVK.findGroup(groupsVKApi, function(result) {
        if (result.length > 0) res.include = true
        console.log(res)
        socket.emit('set_group', res ? res : [])
      })

    })
  })

  socket.on('save_group', async (data) => {

    data.id = groupsVKApi.user_id
    console.log('SAVEGROUP', data)

    groupVK.create(data, function(res) {

    })

    //socket.emit('save_token', data ? data : null)
  })
}
module.exports = { groupsConnection }