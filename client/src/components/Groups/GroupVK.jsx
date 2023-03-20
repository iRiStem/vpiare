import { useGroup } from '../../hooks/io_group.hook';

const GroupVK = ({ info }) => {
  //const { group } = useGroup(id)


  return (
      <div>
        <div>{ info.id }</div>
        <div>{ info.name }</div>

        <div>{
          info.include ?
              <div className={'btn btn-info'}>Подключено</div>
              :
              <a className={'btn btn-success'} href={ info.link }>
                Подключить
              </a>
        }
        </div>
      </div>

  );
};

export default GroupVK;