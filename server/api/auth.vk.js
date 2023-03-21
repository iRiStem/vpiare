const { default: axios } = require('axios');
const config = require('config')

const client_id = config.get('vk_client_id')
const client_secret = config.get('vk_client_secret')
const redirect_url = config.get('vk_redirect_uri')
const user_access_rights = config.get('vk_user_access_rights')


class ApiVK {
  code = ''
  user_id = ''
  access_token = ''

  get access_token_uri () {
    return `https://oauth.vk.com/access_token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_url}&code=${this.code}`
  }

  get users_uri () {
    return `https://api.vk.com/method/users.get?user_ids=${this.user_id}&fields=first_name,last_name,photo_200&access_token=${this.access_token}&v=5.131`
  }


  async getAccessToken(res) {
    try {
      await axios.post(this.access_token_uri).then((result) => {
        this.user_id = result.data.user_id
        this.access_token = result.data.access_token
        return res(result.data)

      })

      //return result

    } catch (e) {
      console.log('Server error', e.message)
      process.exit(1)
    }
  }

  getUserInfo(res) {
    try {
      axios.post(this.users_uri).then((result) => {
        return res(result.data.response ? result.data.response[0] : null)
      })
    } catch(e) {
      return res(null)
    }

  }
}

module.exports = ApiVK