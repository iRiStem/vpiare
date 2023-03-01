const mysql = require('mysql');
const config = require('config')
const options0 = config.get('mysql_connect')
const options = Object.assign({database: config.get('mysql_db_users')}, options0)
//const connection0 = mysql.createConnection(options0);
const connection = mysql.createConnection(options);
connection.connect()

class User {
  create(data, res) {
    let command = `INSERT INTO users (vkId, first_name, last_name, user_token) VALUES ( ${data.user_id} , '${data.first_name}', '${data.last_name}', '${data.access_token}' );`
    connection.query(command, (err, result, field) => {
      console.log(err)
      return res(result)
    })
  }

  update(data, res) {
    let command = `UPDATE users SET first_name = '${data.first_name}', last_name = '${data.last_name}', user_token = '${data.access_token}'  where vkId = ${data.id};`
    connection.query(command, (err, result, field) => {
      console.log(field)
      return res(result)
    })
  }


  findOne(vkId, res) {
    console.log(vkId)
    let command = `select * from users where vkId = ${vkId};`
    connection.query(command, (err, result, field) => {
      if (result.length > 0)
        return res(result[0]);
      return res(null)
    })
  }

}

module.exports = User