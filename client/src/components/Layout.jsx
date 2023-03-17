import { Outlet } from "react-router-dom";

import UserProfile from './UserProfile/UserProfile';
import Sidebar from './Sidebar/Sidebar';

import { useAuth } from '../hooks/io_auth.hook';
import { useGroups } from '../hooks/io_groups.hook';


import { AuthContext } from '../context/AuthContext';
import { GroupsContext } from '../context/GroupsContext';

const Layout = () => {
  const { auth } = useAuth()
  const { groupsVK, groupsIdsInfo, groupsApp } = useGroups()

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
              <div className="col-3">
                <Sidebar />
              </div>
              <div className="col-9">
                {<GroupsContext.Provider value={{groupsVK, groupsIdsInfo, groupsApp}}>
                  <Outlet />
                </GroupsContext.Provider>}
              </div>
            </div>
          </div>
        </div>
      </AuthContext.Provider>
  )
}
export default Layout;