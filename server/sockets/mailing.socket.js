const GroupVK = require('../data/models/GroupVK')
const Mailing = require('../data/models/Mailing')

const ApiGroupsVK = require('../api/groups.vk')

//let user = new User()
let groupVK = new GroupVK()
let mailing = new Mailing()

let groupsVKApi = new ApiGroupsVK()

const mailingConnection = (io, socket, authVk, user) => {

  const sendTestMessage = () => {
    const apiKey = 'vk1.a.nwW0IOTrCt0h9PhHB-2ODNETIHnVT4uKnLQYkb18LMPwsMBXyPXyMMgoA434p8BkjDoM5Ee5eZc50qntKrVtvdMfOGMu-d2pU2HR54bH5nnyqvLKqDS0yZUDWlZPV_7XUV7WoAe4q7LKzyysO5mYTPagzDsmJqsgkGAz_xmekF_vYUz9Tl9E1_5bP14tYdidyVUMeSxsAFIppQPptTqpuQ'
    const arr = ['782474893'].join(',')
    const params = {
      peer_ids: `${arr}`,
      access_token: `${apiKey}`,
      message: `${encodeURIComponent('Вы подписаны V-PIARE_V2')}`,
      dont_parse_links: 0,
      random_id: 0,
      disable_mentions: 0,
      intent: 'default',
    }

    groupsVKApi.getMethodData('messages.send', params, function (res) {
      console.log('messages.send', res)
    })
  }


  const sendMessage = (data, db) => {
    let apiKey = ''
    let users = []

    mailing.findGroupDB(db, function (res) {
      if (res) {

        getDataMailing(db, function (result) {
          const params = {
            peer_ids: `${result.users}`,
            access_token: `${result.apiKey}`,
            message: `${encodeURIComponent(data.textMailing)}`,
            dont_parse_links: 0,
            random_id: 0,
            disable_mentions: 0,
            intent: 'default',
          }

          groupsVKApi.getMethodData('messages.send', params, function (res) {
            console.log('messages.send', res)
          })
        });



      }

    })
  }


  const getDataMailing = (db, res) => {
    mailing.selectGroupInfo(db, function (result) {
      apiKey = result ? result[0].apiKey : '';

      getUsers(db, function (resultUsers) {
        return res({apiKey: apiKey, users: resultUsers.join(',')})
      })

    })
  }

  const getUsers = (db, res) => {
    mailing.selectUsersList(db, function (result) {
      users = result.map(user => { return user.vkId })
      return res(users)
    })
  }


  socket.on('send_mailing', (data, db) => {
    console.log(db)

    sendMessage(data, db)
  })

  socket.on('add_newSubscriber', (data) => {
    console.log(data)
    if (data) {
      groupVK.newSubscriber(data, function(res) {
        console.log(res)
        sendTestMessage()

      })
    }
  });

}
module.exports = { mailingConnection }