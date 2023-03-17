const mysql = require('mysql');
const config = require('config')
const options0 = config.get('mysql_connect')

const connection0 = mysql.createConnection(options0);
//const connection = mysql.createConnection(options);
connection0.connect()

const { default: axios } = require('axios');

class Mailing {
  findGroupDB(db, res) {
    let command = `select * FROM INFORMATION_SCHEMA.SCHEMATA where SCHEMA_NAME = '${db}';`
    connection0.query(command, (err, result, field) => {
      if (result) {
        return res(result.map(item => item.SCHEMA_NAME.split('g')[1]));
      }

      return res(null)
    })
  }

  selectGroupInfo(db, res) {
    const options = Object.assign({database: db}, options0)
    const connection = mysql.createConnection(options);
    let command = `SELECT * FROM groupInfo`;
    connection.query(command, (err, resultgroupInfo, field) => {
      return res(resultgroupInfo)
    })
  }

  selectUsersList(db, res) {
    const options = Object.assign({database: db}, options0)
    const connection = mysql.createConnection(options);
    let command = `SELECT * FROM usersList`;
    connection.query(command, (err, resultUsers, field) => {
      return res(resultUsers)
    })
  }

}

module.exports = Mailing