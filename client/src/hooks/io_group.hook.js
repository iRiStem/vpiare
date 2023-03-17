import {useEffect, useState} from 'react';
import {useSocket} from '../connections/io_connect';

export function useGroup(id) {

  const {socket} = useSocket()

  const [group, setGroup] = useState();


  useEffect(() => {
        socket.emit('get_group', id)

        socket.on('set_group', (data) => {
          if (data) {
            setGroup(data)
          }
        })
      },
      []
  )

  return {group}
}
