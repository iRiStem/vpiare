import { useAuth } from '../../hooks/io_auth.hook';
import { useGroups } from '../../hooks/io_groups.hook';
import UserProfile from '../../components/UserProfile/UserProfile';
import GroupVK from '../../components/Groups/GroupVK';

const LinkGroup = () => {
  const { auth } = useAuth()
  const { groups } = useGroups()
  return (
      <div className="Cabinet">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">V-piare</a>
            <div className="d-flex">
              {auth ? <UserProfile auth={ auth }/> : '' }
            </div>
          </div>
        </nav>
        <div className="container  text-center">
          <h1>Cabinet</h1>

          <h3>Сообщества</h3>
          <div>{groups ? groups.count : 'нет сообществ' }</div>

          {groups ? groups.items.map((id, key) => {
                return (<GroupVK key={key} id={id} auth={ auth }/>)
              }) : ''}
        </div>
      </div>
  );
}
export default LinkGroup;