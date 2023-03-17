import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Main from './pages/Main/Main';
import Cabinet from './pages/Cabinet/Cabinet';
import LinkGroup from './pages/LinkGroup/LinkGroup';
import Subscriptions from './pages/Subscriptions/Subscriptions';
import NewGroup from './pages/NewGroup/NewGroup';
import NewMailing from './pages/NewMailing/NewMailing';

import { useAuth } from './hooks/io_auth.hook';
import { AuthContext } from './context/AuthContext';


import Vpiare from './Vpiare/Vpiare';

import Layout from './components/Layout';

function App() {
  const RequireAuth = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('userId')) || null;
    return currentUser ? (children) : <Navigate to='/' />
  };



  return (
    <div className="App">

        <Routes>
          <Route path="/vpiare" element={<Vpiare />} />
          <Route path="/" element={<Main />} />

          <Route path="/cabinet/*"  element={
            <Layout />
          }>
            <Route index  element={
              <Cabinet />
            } />

            <Route path="subscriptions"  element={
              <RequireAuth>
                <Subscriptions />
              </RequireAuth>
            } />

            <Route path="new-group" element={
              <RequireAuth>
                <NewGroup />
              </RequireAuth>
            } />

            <Route path="new-mailing" element={
              <RequireAuth>
                <NewMailing />
              </RequireAuth>
            } />

            <Route path="link-group" element={
              <RequireAuth>
                <LinkGroup />
              </RequireAuth>
            } />
          </Route>


        </Routes>


    </div>
  );
}

export default App;
