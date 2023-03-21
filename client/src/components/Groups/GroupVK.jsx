import { useGroup } from '../../hooks/io_group.hook';

const GroupVK = ({ info }) => {
  //const { group } = useGroup(id)


  return (
      <div className="card-body">
        <h6 className="card-title">{ info.name }</h6>

        <div>{
          info.include ?
              <div className={'btn btn-info'}>Подключено</div>
              :
              <a className={'btn btn-success'} href={ info.link }>
                Подключить
              </a>
        }
        </div>
        <small>test info - { info.id }</small>
      </div>

  );
};

export default GroupVK;