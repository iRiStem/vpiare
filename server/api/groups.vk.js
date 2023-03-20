const { default: axios } = require('axios');
const config = require('config')

const client_id = config.get('vk_client_id')
const client_secret = config.get('vk_client_secret')
const api_url = 'https://api.vk.com/method/'
const api_v = '5.131'

class ApiGroupsVK {
  user_id = ''
  access_token = ''
  group_id = ''





  get groups_uri () {
    return `https://api.vk.com/method/groups.get?user_ids=${this.user_id}&access_token=${this.access_token}&v=5.131`
  }

  get groupById_uri () {
    return `https://api.vk.com/method/groups.getById?access_token=${this.access_token}&group_id=${this.group_id}&v=5.131`
  }

  get groupById_link () {
    return `https://oauth.vk.com/authorize?client_id=${client_id}&redirect_uri=${config.get('vk_redirect_uri')}&group_ids=${this.group_id}&display=page&scope=photos,messages,docs,manage&response_type=code&v=5.131`
  }

  getMethodData(method, params, res) {
    const data = Object.assign({'access_token': this.access_token, 'v': api_v}, params)
    const str = Object.entries(data)
        .map(([k, v]) => `${k}=${v}`)
        .join('&');

    try {
      axios.post(`${api_url}${method}?${str}`)
          .then((result) => {
        return res(result.data.response ? result.data.response : null)
      })
    } catch(e) {
      console.log(e)
      return res(null)
    }
  }


  getGroups(res) {
    try {
      axios.post(this.groups_uri).then((result) => {
        console.log('groups', result.data)
        return res(result.data.response ? result.data.response : null)
      })
    } catch(e) {
      return res(null)
    }

  }

  getGroupById(res) {
    console.log('get groupById')
    try {
      axios.post(this.groupById_uri).then((result) => {
        console.log('group', result.data)

        if (result.data.response) result.data.response[0].link = this.groupById_link
        return res(result.data.response ? result.data.response[0] : null)
      })
    } catch(e) {
      return res(null)
    }

  }
}
module.exports = ApiGroupsVK