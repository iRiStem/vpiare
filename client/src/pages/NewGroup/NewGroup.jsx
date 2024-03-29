import {useNewAppGroup} from '../../hooks/io_app_newgroup.hook';
import {useContext, useEffect, useState} from 'react';
import {GroupsContext} from '../../context/GroupsContext';


const NewGroup = () => {
  const groups  = useContext(GroupsContext)

  const groupsIdsInfo = groups.groupsIdsInfo
  const groupsApp = groups.groupsApp
  const groupsIdsInclude = groups.groupsIdsInclude

  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const miniAppId = process.env.REACT_APP_MINI_ID


  const { createNewGroup } = useNewAppGroup()
  const [idGroup, setIdGroup] = useState(0)
  const [linkGroup, setLinkGroup] = useState()
  const [idGroupVK, setIdGroupVK] = useState(groupsIdsInclude[0] ? groupsIdsInclude[0] : '')
  const [form, setForm] = useState({
    nameGroup: '',
    titleGroup: '',
    textGroup: '',
    linkGroup: '',
    textButtonOne: 'Подписаться',
    textButtonTwo: 'Отписаться',
    idGroup: ''
  });



  const changeHandler = event => {
    const num = groupsApp[idGroupVK] ? groupsApp[idGroupVK].length : 0
    setIdGroup( (num > 0) ? (groupsApp[idGroupVK][num - 1].idGroup + 1) : 1)
    const link = `https://vk.com/app${miniAppId}#m=${idGroup}_${idGroupVK}-${userId}`
    setForm({ ...form, ...{[event.target.name]: event.target.value, ['linkGroup']: link, ['idGroup']: idGroup} })
  }

  const changeGroupHandler = event => {
    setIdGroupVK(event.target.value)
  }

  const saveHandler = event => {
    createNewGroup(form, `u${userId}_g${idGroupVK}`)
  }


  return (
      <div className="Content">
        <h1 className="text-center">Кабинет</h1>
        <h3>Новая группа</h3>

        <h4>{ groupsIdsInclude ? groupsIdsInclude.length : 0 }</h4>

        <h4>{ form.linkGroup }</h4>

        <div className="mb-3">
          <label className="form-label">Сообщество</label>
          <select
                 name="idGroup"
                 value={idGroupVK}
                 placeholder="Выберите сообщество"
                 className="form-control" onChange={changeGroupHandler} >
            <option>Выберите сообщество</option>
            {
              groupsIdsInclude.map((item, key) => {
                return <option key={key} value={item}>{groupsIdsInfo[item].name}</option>
              })
            }

          </select>
        </div>


        <div className="mb-3">
          <label className="form-label">Название</label>
          <input type="text"
                 name="nameGroup"
                 value={form.nameGroup}
                 placeholder="Введите название группы"
                 className="form-control" onChange={changeHandler} />
        </div>
        <div className="mb-3">
          <label className="form-label">Заголовок</label>
          <input type="text"
                 name="titleGroup"
                 value={form.titleGroup} placeholder="Введите Заголовок подписки"  className="form-control" onChange={changeHandler} />
        </div>
        <div className="mb-3">
          <label className="form-label">Описание</label>
          <textarea
              className="form-control"
              name="textGroup" id="" rows="3" value={form.textGroup} placeholder="Введите текст сообщения" onChange={changeHandler} />
        </div>
        <div>
          <button type="submit"
                  className="btn btn-primary mb-3"
                  onClick={saveHandler}
          >Сохранить</button>
        </div>
      </div>
  );
}
export default NewGroup;