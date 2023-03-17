import { useContext, useState } from 'react';
import { GroupsContext } from '../../context/GroupsContext';
import GroupVK from '../../components/Groups/GroupVK';
import UserGroups from '../../components/Groups/UserGroups';



const Subscriptions = () => {

  const groups  = useContext(GroupsContext)
  const groupsVK = groups.groupsVK
  const groupsIdsInfo = groups.groupsIdsInfo
  const groupsApp = groups.groupsApp

  const [showId, setShowId] = useState()

  const setShowClassId = event => {
    setShowId(event.target.id)
  }

  return (
      <div className="Content">
        <h1 className="text-center">Cabinet</h1>
        <h3>Subscriptions</h3>

        <div className="accordion">
          {groupsVK ? groupsVK.items.map((id, key) => {
                return (
                    <div className="accordion-item" key={key}>
                      <h2 className="accordion-header">
                        <button className="accordion-button" id={id} type="button" onClick={setShowClassId}>
                          <GroupVK key={key} info={groupsIdsInfo[id] ? groupsIdsInfo[id] : {}}/>
                        </button>
                      </h2>
                      <div  className={`accordion-collapse collapse ${ showId === id.toString() ? 'show' : ''}`} >
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