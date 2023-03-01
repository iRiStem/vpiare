import {
  Routes,
  Route,

} from "react-router-dom";
import Main from './pages/Main/Main';
import Cabinet from './pages/Cabinet/Cabinet';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cabinet" element={<Cabinet />} />
      </Routes>
    </div>
  );
}

export default App;
