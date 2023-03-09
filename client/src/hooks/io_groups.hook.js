import {useEffect, useState} from 'react';
import {useSocket} from '../connections/io_connect';
import {useNavigate} from "react-router-dom";


export function useGroups() {
  let navigate = useNavigate();
  const {socket} = useSocket()


  const [groups, setGroups] = useState();


  useEffect(() => {
    socket.on('set_groups', (data) => {
      if (data) {
        setGroups(data)
      } else {
        navigate("/", {replace: true})
      }

    })


  }, [socket])


  return {groups}
}