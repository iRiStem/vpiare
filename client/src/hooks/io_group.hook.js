import {useEffect, useState} from 'react';
import {useSocket} from '../connections/io_connect';
import {useNavigate} from "react-router-dom";

export function useGroup(auth, id) {
  let navigate = useNavigate();
  const {socket} = useSocket()

  const [group, setGroup] = useState();

  useEffect(() => {
        socket.emit('get_group', auth, id)
        socket.on('set_group', (data) => {
          console.log(data)
          if (data) {
            setGroup(data)
          }
        })
      },
      []
  )
  return {group}
}
