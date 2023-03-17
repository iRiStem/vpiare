import { useContext } from 'react';
import { GroupsContext } from '../../context/GroupsContext';
import GroupVK from '../../components/Groups/GroupVK';

const Cabinet = () => {
  const groups  = useContext(GroupsContext)
  const groupsVK = groups.groupsVK
  const groupsIdsInfo = groups.groupsIdsInfo

  return (
      <div className="Content">
        <h1 className="text-center">Cabinet</h1>

        <h3>Сообщества</h3>
        <div>{groupsVK ? groupsVK.count : 'нет сообществ' }</div>

        <div>
          {groupsVK ? groupsVK.items.map((id, key) => {
                return (<GroupVK key={key} info={groupsIdsInfo[id] ? groupsIdsInfo[id] : {}}/>)
              }) : ''}
        </div>
      </div>


  );
}
export default Cabinet;