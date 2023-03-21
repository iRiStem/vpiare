import { Outlet } from "react-router-dom";

import UserProfile from './UserProfile/UserProfile';
import Sidebar from './Sidebar/Sidebar';

import { useAuth } from '../hooks/io_auth.hook';
import { useGroups } from '../hooks/io_groups.hook';


import { AuthContext } from '../context/AuthContext';
import { GroupsContext } from '../context/GroupsContext';

const Layout = () => {
  const { auth } = useAuth()
  const { groupsVK, groupsIdsInfo, groupsApp, groupsIdsInclude } = useGroups()

  return (
      <AuthContext.Provider value={{auth}}>
        <div className="Cabinet">

          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/cabinet">V-piare</a>
              <div className="d-flex">
                {auth ? <UserProfile auth={ auth }/> : '' }
              </div>
            </div>
          </nav>


          <div className="container  ">
            <div className="row justify-content-start pt-4">
              { groupsVK.count > 0 ?
                  <div className="col-3">
                    <Sidebar />
                  </div>
                  : ''
              }
              { groupsVK.count > 0 ?
                  <div className="col-9">
                    {<GroupsContext.Provider value={{groupsVK, groupsIdsInfo, groupsApp, groupsIdsInclude}}>
                      <Outlet />
                    </GroupsContext.Provider>}
                  </div>
                  :
                  <div className="col-12">
                    <div className="alert alert-info">
                      <p>
                      <a className="btn btn-info" href="https://vk.com/groups?w=groups_create">
                        Cоздать сообщество
                      </a>
                      </p>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
      </AuthContext.Provider>
  )
}
export default Layout;