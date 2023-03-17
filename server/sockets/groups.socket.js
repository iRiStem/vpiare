//const User = require('../data/models/User')
const GroupVK = require('../data/models/GroupVK')

const ApiGroupsVK = require('../api/groups.vk')

//let user = new User()
let groupVK = new GroupVK()

let groupsVKApi = new ApiGroupsVK()

const groupsConnection = (io, socket, authVk, user) => {


  const getGroupsApp = (items) => {
    groups_app = {}
    items.forEach(gid => {
      let db = `u${authVk.user_id}_g${gid}`
      groupVK.getUserGroups(db, function(result) {
        groups_app[gid] = result
        socket.emit('set_groups_app', groups_app)
      })
    })
  }


  const getGroupsIdsInfo = (items) => {
    const params = {'group_ids': items.join(',')}
    groupsVKApi.getMethodData('groups.getById', params, function (res) {
      if (res) {
        const groups_ids = {};
        res.forEach(item => {
          setGroupIdInfo(item)
        });

      }
    })
  }


  const setGroupIdInfo = (item) => {
    groupsVKApi.group_id = item.id
    groupVK.findGroup(groupsVKApi, function(result) {
      if (result.length > 0) item.include = true
      socket.emit('set_group_id', item)
    })
  }

  socket.on('get_groups_vk', async () => {
    groupsVKApi.user_id = authVk.user_id;
    groupsVKApi.access_token = authVk.access_token
    const params = {'user_ids': authVk.user_id}
    groupsVKApi.getMethodData('groups.get', params, function (res) {
      if (res) {
        getGroupsApp(res.items ? res.items : [])
        getGroupsIdsInfo(res.items ? res.items : [])
        socket.emit('set_groups_vk', res)
      }

      if (!res) {
        socket.emit('logout')
      }

    })
  })







  socket.on('get_group', async (id) => {
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

  socket.on('new_group', async (data, db) => {
    console.log(data)
    groupVK.createUserGroup(data, db, function(res) {

    })
  })

  socket.on('get_userGroups', async (data) => {
    groupVK.getUserGroups(data.db, function(res) {
      console.log(res)
      socket.emit('send_userGroups', res)

    })
  })
}
module.exports = { groupsConnection }