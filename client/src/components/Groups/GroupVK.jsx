import { useNavigate } from "react-router-dom";
import { useGroup } from '../../hooks/io_group.hook';

const GroupVK = ({ id, auth }) => {
  const { group } = useGroup(auth, id)
  return (
      <div>
        <div>{ id }</div>
        <div>{ auth.user_id}</div>
        <div>{ group? group.name : ''}</div>
        <div>{ group?
            group.include ?
                <div className={'btn btn-info'}>Подключено</div>
                :
                <a className={'btn btn-success'} href={ group? group.link : ''}>
                  Подключить
                </a>
            : ''
      }</div>

      </div>

  );
};

export default GroupVK;