
import {useContext, useEffect, useState} from 'react';
import {GroupsContext} from '../../context/GroupsContext';

import {useNewAppMailing} from '../../hooks/io_app_newmailing.hook';

const NewMailing = () => {
  const groups  = useContext(GroupsContext)
  const groupsVK = groups.groupsVK
  const groupsIdsInfo = groups.groupsIdsInfo
  const groupsApp = groups.groupsApp
  const groupsIdsInclude = groups.groupsIdsInclude

  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);




  const { sendNewMailing } = useNewAppMailing()
  const [idGroup, setIdGroup] = useState(0)

  const [idGroupVK, setIdGroupVK] = useState(groupsIdsInclude.length > 0 ? groupsIdsInclude[0] : '')
  const [form, setForm] = useState({
    nameMailing: '',
    textMailing: '',
    snippet: '0',
    //dateCreate: regData,
    //dateActive: date,
    status: 'waiting',
    //variables: otvet,
    type: 'Разовая рассылка',
    //countResipients: countResipients.length > 0 ? countResipients : 'all',
    //unicId: password
  });



  const changeHandler = event => {
    setForm({ ...form, ...{[event.target.name]: event.target.value, ['idGroupVK']: idGroupVK} })
  }

  const changeGroupHandler = event => {
    setIdGroupVK(event.target.value)
  }

  const sendHandler = event => {
    console.log(form)
    sendNewMailing(form, `u${userId}_g${idGroupVK}`)
  }

  return (
      <div className="Content">
        <h1 className="text-center">Cabinet</h1>
        <h3>NewMailing</h3>

        <h4>{ groupsIdsInclude ? groupsIdsInclude.length : 0 }</h4>

        <div className="mb-3">
          <label className="form-label">Сообщество</label>
          <select
              name="idGroup"
              value={idGroupVK}
              placeholder="Выберите сообщество"
              className="form-control" onChange={changeGroupHandler} >
            <option value="0">Выберите сообщество</option>
            {
              groupsIdsInclude.map((item, key) => {
                return <option key={key} value={item}>{item}</option>
              })
            }

          </select>
        </div>


        <div className="mb-3">
          <label className="form-label">Название</label>
          <input type="text"
                 name="nameMailing"
                 value={form.nameMailing}
                 placeholder="Введите название группы"
                 className="form-control" onChange={changeHandler} />
        </div>

        <div className="mb-3">
          <label className="form-label">Сообщение</label>
          <textarea
              className="form-control"
              name="textMailing" id="" rows="3" value={form.textMailing} placeholder="Введите текст сообщения" onChange={changeHandler} />
        </div>
        <div>
          <button type="submit"
                  className="btn btn-primary mb-3"
                  onClick={sendHandler}
          >Отправить</button>
        </div>
      </div>
  );
}
export default NewMailing;