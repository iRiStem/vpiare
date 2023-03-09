import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from './pages/Main/Main';
import Cabinet from './pages/Cabinet/Cabinet';
import LinkGroup from './pages/LinkGroup/LinkGroup';


function App() {
  const RequireAuth = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('userId')) || null;
    return currentUser ? (children) : <Navigate to='/' />
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cabinetOld" element={<Cabinet />} />

        <Route path="/cabinet">
          <Route index element={
            <Cabinet />
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
