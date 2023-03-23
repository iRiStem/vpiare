import { useContext, useState } from 'react';
import { GroupsContext } from '../../context/GroupsContext';
import GroupVK from '../../components/Groups/GroupVK';
import UserGroups from '../../components/Groups/UserGroups';



const Subscriptions = () => {

  const groups  = useContext(GroupsContext)
  const groupsIdsInfo = groups.groupsIdsInfo
  const groupsApp = groups.groupsApp
  const groupsIdsInclude = groups.groupsIdsInclude



  const [showId, setShowId] = useState()

  const setShowClassId = (event, id) => {
    setShowId(id)
  }

  return (
      <div className="Content">
        <h1 className="text-center">Кабинет</h1>
        <h3>Группы</h3>

        <div className="accordion">
          {groupsIdsInclude ? groupsIdsInclude.map((id, key) => {
                return (
                    <div className="accordion-item" key={key}>
                      <h2 className="accordion-header">
                        <button className="accordion-button" name={id} type="button" onClick={(ev) => setShowClassId(ev, id)}>
                          <GroupVK key={key} info={groupsIdsInfo[id] ? groupsIdsInfo[id] : {}}/>
                        </button>
                      </h2>
                      <div  className={`accordion-collapse collapse ${ showId === id ? 'show' : ''}`} >
                        <div className="accordion-body">
                          {groupsApp[id] ?
                              <UserGroups key={key} items={groupsApp[id]}/>
                              : ''}
                        </div>
                      </div>
                    </div>
                )
              }) : ''}

        </div>
      </div>
  );
}
export default Subscriptions;