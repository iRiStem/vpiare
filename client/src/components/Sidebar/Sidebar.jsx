import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light">
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to={`/cabinet/`} className='nav-link'>Сообщества</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`subscriptions`} className='nav-link'>Группы подписчиков</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`new-group`} className='nav-link'>Добавить группу</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`new-mailing`} className='nav-link'>Добавить рассылку</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to={`link-group`} className='nav-link'>Подписчики</NavLink>
          </li>
        </ul>

      </div>
  );
}
export default Sidebar;