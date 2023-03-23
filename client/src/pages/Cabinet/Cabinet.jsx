import { useContext } from 'react';
import { GroupsContext } from '../../context/GroupsContext';
import GroupVK from '../../components/Groups/GroupVK';

const Cabinet = () => {
  const groups  = useContext(GroupsContext)
  const groupsVK = groups.groupsVK
  const groupsIdsInfo = groups.groupsIdsInfo

  return (
      <div className="Content">
        <h1 className="text-center">Кабинет</h1>

        <h3>Сообщества <span className="badge bg-secondary">{groupsVK.count}</span></h3>

        <div className="row">
          {groupsVK ? groupsVK.items.map((id, key) => {
                return (
                    <div className="card col-3 m-2" key={key}>
                      <GroupVK key={key} info={groupsIdsInfo[id] ? groupsIdsInfo[id] : {}}/>
                    </div>
                  )
              }) : ''}
        </div>
      </div>


  );
}
export default Cabinet;