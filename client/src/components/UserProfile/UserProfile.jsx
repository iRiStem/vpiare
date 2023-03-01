import { useNavigate } from "react-router-dom";

const UserProfile = ({ auth }) => {

  let navigate = useNavigate();

  return (
      <div className="navbar-nav">
        <div className="nav-item" onClick={() => {
          localStorage.clear();
          navigate(`/`);
        }}>
          <span>Выход</span>
        </div>
        <div className='nav-item'>
          <img src={auth.photo_200} alt="" width="30"/>
          <span>{auth.first_name} {auth.last_name}</span>
        </div>
      </div>

  );
};

export default UserProfile;