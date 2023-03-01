import { useAuth } from '../../hooks/io_auth.hook';
import UserProfile from '../../components/UserProfile/UserProfile';

const Cabinet = () => {
  const { auth } = useAuth()
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
        </div>
      </div>
  );
}
export default Cabinet;