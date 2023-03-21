const mysql = require('mysql');
const config = require('config')
const options0 = config.get('mysql_connect')

const connection0 = mysql.createConnection(options0);
//const connection = mysql.createConnection(options);
connection0.connect()

const { default: axios } = require('axios');

class GroupVK {

  newSubscriber(data, res) {
    const options = Object.assign({database: data.db}, options0)

    const connection = mysql.createConnection(options);

    let command = `SELECT * FROM usersList WHERE vkId = ${data.user}`;

    connection.query(command, (err, result, field) => {
      if (result.length > 0) {

        let command = `UPDATE usersList SET subscriptions = CONCAT(subscriptions, '${data.subId},') WHERE vkId=${data.user};`;
        connection.query(command, (err, result, field) => {
          if (result) {
            console.log('Подписка добавлена')
            return res('Подписка добавлена')
          }
          else {
            console.log(err)
          }
        })

      }
      else {

        let command = `SELECT * FROM groupInfo`;

        connection.query(command, (err, result, field) => {
          if (result) {
            const apiKey = result[0].apiKey;
            const relation = {
              '1': 'не женат/не замужем',
              '2': 'есть друг/есть подруга',
              '3': 'помолвлен/помолвлена',
              '4': 'женат/замужем',
              '5': 'все сложно',
              '6': 'в активном поиске',
              '7': 'влюблен/влюблена',
              '8': 'в гражданском браке',
              '0': 'не указано',
            }
            let NewData = new Date();
            let options = { weekday: 'narrow', year: 'numeric', month: '2-digit', day: 'numeric' };
            let regData = NewData.toLocaleString(options).split(',').join('');
            axios.post(`https://api.vk.com/method/users.get?user_ids=${data.user}&fields=country,city,relation&access_token=${apiKey}&v=5.131`)
                .then((dataInfo) => {
                  if (dataInfo) {
                    const info = dataInfo.data.response[0]
                    const user = {
                      vkId: `${info.id}`,
                      firstName: info.first_name,
                      lastName: info.last_name,
                      country: info.country ? info.country.title : '',
                      city: info.city ? info.city.title : '',
                      relation: info.relation ? relation[info.relation] : '',
                      dateSubscribe: regData,
                      subscriptions: `${data.subId}, `
                    }

                    let command = `INSERT INTO usersList (${Object.keys(user)}) VALUES (${Object.values(user).map(item => `'${item}'`)});`;

                    connection.query(command, (err, result, field) => {
                      if (result) {
                        console.log('Пользователь добавлен в базу')
                      }
                      else {
                        console.log(err)
                      }
                    })


                  }
                })

          }
          else {
            console.log(err)
          }
        })

      }
    })
  }


  getUserGroupsInclude(user_id, items, res) {

    let newArr = items.map(item => `(SCHEMA_NAME = 'u${user_id}_g${item}')`).join(' or ')
    let command = `select * FROM INFORMATION_SCHEMA.SCHEMATA where ${newArr};`

    connection0.query(command, (err, result, field) => {

      let groupsInDB = result.map(item => parseInt(item.SCHEMA_NAME.split('g')[1]));


      return res(groupsInDB)
    })


  }

  getUserGroups(db, res) {
    const options = Object.assign({database: db}, options0)

    const connection = mysql.createConnection(options);
    let command = `SELECT * FROM usersGroups`;

    connection.query(command, (err, resultGroups, field) => {

      if (resultGroups) {

        let command = `SELECT * FROM usersList`;
        connection.query(command, (err, resultUsers, field) => {

          if (resultUsers) {

            let newArr = resultGroups.map(item => {

              return {
                ...item,
                subscribers: resultUsers.filter(el => el.subscriptions.split(' ').join('').split(',').includes(String(item.idGroup)))
              }
            })

            return res(newArr)

          }
          else if (err) {
            console.log(err)
          }
        })

      }
      else if (err) {
        console.log(err)
      }

    })

  }



  createUserGroup(data, db, res) {
    const options = Object.assign({database: db}, options0)

    const connection = mysql.createConnection(options);

    let command = `INSERT INTO usersGroups (${Object.keys(data)}) VALUES (${Object.values(data).map(item => `'${item}'`)});`;

    connection.query(command, (err, result, field) => {
      if (result) {
        console.log('Группа подписчиков добавлена')
      }
      else {
        console.log(err)
      }
    })
  }

  findGroups(vkId, groups, res) {

    let newArr = groups.items.map(item => `(SCHEMA_NAME = 'u${vkId}_g${item}')`).join(' or ')
    let command = `select * FROM INFORMATION_SCHEMA.SCHEMATA where ${newArr};`

    connection0.query(command, (err, result, field) => {

      if (result.length > 0)
        return res(result.map(item => item.SCHEMA_NAME.split('g')[1]));
      return res(null)
    })
  }

  findGroup(data, res) {

    let newArr = `SCHEMA_NAME = 'u${data.user_id}_g${data.group_id}'`
    let command = `select * FROM INFORMATION_SCHEMA.SCHEMATA where ${newArr};`
    connection0.query(command, (err, result, field) => {
      if (result) {
        return res(result.map(item => item.SCHEMA_NAME.split('g')[1]));
      }

      return res(null)
    })
  }

  create(data, res) {

    console.log(data.groups)

    let groupToken = data.groups[0];
    let command = `CREATE DATABASE u${data.id}_g${groupToken.group_id};`;

    connection0.query(command, (err, result, field) => {
      if (result) {

        const options = Object.assign({database: `u${data.id}_g${groupToken.group_id}`}, options0)
        const connection = mysql.createConnection(options);

        let queries = []
        queries[0] = `CREATE TABLE groupInfo(apiKey varchar(500), groupId varchar(255) PRIMARY KEY);`;
        queries[1] = `INSERT INTO groupInfo (apiKey, groupId) VALUES ('${groupToken.access_token}','${groupToken.group_id}');`;
        queries[2] = `CREATE TABLE listMailing(id int PRIMARY KEY AUTO_INCREMENT, groupUsers varchar(255), ignoreGroups varchar(800), nameMailing varchar(255), textMailing varchar(1000), snippet varchar(255), dateCreate varchar(500), dateActive varchar(500), status varchar(400), variables varchar(255), type varchar(255), countResipients varchar(1000), unicId varchar(1000));`;
        queries[3] = `CREATE TABLE usersGroups(idGroup int PRIMARY KEY AUTO_INCREMENT, linkGroup varchar(800), nameGroup varchar(800), titleGroup varchar(800), bannerGroup varchar(800), textButtonOne varchar(800), textButtonTwo varchar(800), textGroup varchar(1200), pageSub varchar(1200), pageUnsub varchar(1200), autoMessage varchar(3000), textPopupSub varchar(800), textPopupUnsub varchar(800), textButtonSub varchar(800), textButtonUnsub varchar(800), dateCreate varchar(800), dateActive varchar(800) );`;
        queries[4] = `CREATE TABLE usersList(vkId varchar(500) PRIMARY KEY, firstName varchar(500), lastName varchar(500), country varchar(500), city varchar(500), relation varchar (500), dateSubscribe varchar (500), subscriptions varchar(900));`;
        queries[5] = `CREATE TABLE landings(id int PRIMARY KEY AUTO_INCREMENT, landingFileName varchar(1000), landingTitle varchar(1000), landingText varchar(1000), landingSubs varchar(1000), landingUsers varchar(2000), landingLink varchar(2000), landingTextButton varchar(1000), landingLinkButton varchar(1000), landingUnicId varchar(1000));`;

        queries.forEach((q, k) => {
          connection.query(q, (err, result, field) => {
            if (result) {
              console.log("Запрос удачно " + k)
            }

            else {
              console.log("Ошибка " + k)
            }

          })

        })
      }
    })
  }
}

module.exports = GroupVK