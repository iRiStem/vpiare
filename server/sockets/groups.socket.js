//const User = require('../data/models/User')
const GroupVK = require('../data/models/GroupVK')

const ApiGroupsVK = require('../api/groups.vk')

//let user = new User()
let groupVK = new GroupVK()

let groupsVKApi = new ApiGroupsVK()

const groupsConnection = (io, socket, authVk, user) => {


  const getGroupsApp = (items) => {
    groupVK.getUserGroupsInclude(authVk.user_id, items, function(result) {
      groups_app = {}
      items.forEach(gid => {
        if (result.indexOf(gid) < 0) {
          //groups_app[gid] = []
          //socket.emit('set_groups_app', groups_app)
        }
        else {
          let db = `u${authVk.user_id}_g${gid}`
          groupVK.getUserGroups(db, function(res) {
            groups_app[gid] = res
            socket.emit('set_groups_app', groups_app)
          })
        }


      })
    })
  }


  const getGroupsIdsInfo = (items) => {
    const params = {'group_ids': items.join(',')}
    groupsVKApi.getMethodData('groups.getById', params, function (res) {
      if (res) {
        const groups_ids = {};
        const groups_ids_include = [];
        res.forEach(item => {
          setGroupIdInfo(item , function (result) {
            groups_ids[item.id] = result
            socket.emit('set_groups_ids', groups_ids)

            if(result.include) groups_ids_include.push(item.id)
            socket.emit('set_groups_ids_include', groups_ids_include)
          })
        });

      }
    })
  }


  const setGroupIdInfo = (item, res) => {
    //socket.emit('set_group_id', item)
    groupsVKApi.group_id = item.id
    item.link = groupsVKApi.groupById_link


    groupVK.findGroup(groupsVKApi, function(result) {
      if (result.length > 0) item.include = true
      return res(item)
    })
  }

  socket.on('get_groups_vk', async () => {
    groupsVKApi.user_id = authVk.user_id;
    groupsVKApi.access_token = authVk.access_token
    const params = {
      'user_ids': authVk.user_id,
      'extended':0,
      'filter': 'admin'

    }

    groupsVKApi.getMethodData('groups.get', params, function (res) {
      if (res) {
        socket.emit('set_groups_vk', res)
        getGroupsApp(res.items ? res.items : [])
        getGroupsIdsInfo(res.items ? res.items : [])
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