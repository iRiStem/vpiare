import {useEffect, useState} from 'react';
import { useSocket } from '../connections/io_connect';
import { useNavigate } from "react-router-dom";


export function useAuth() {
  let navigate = useNavigate();
  const { socket } = useSocket()
  const code = window.location.href.split('=')[1];
  const [auth, setAuth] = useState();


  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);



  useEffect(() => {
    socket.emit('test_server', 'test_server')
    if (code) {
      userAuth()
    }

    if (userId !== null && !code) {
      socket.emit('get_user', userId)
    }
    // eslint-disable-next-line
  }, [])


  const userAuth = async() => {
    socket.emit('access_token', code)
  }

  useEffect(() => {
    socket.on('send_test_server', (data) => {
      console.log(data)
    })

    socket.on('access_token', (data) => {
      console.log(data)
      if (!data) {
        navigate("/", { replace: true })
      }

      if (data.access_token) {
        socket.emit('auth_user', data)
        navigate("/cabinet", { replace: true })
      }
      if (!data.access_token) {
        socket.emit('get_user', userId)
        socket.emit('save_group', data)
        navigate("/cabinet", { replace: true })
      }


    })

    socket.on('auth_user', (data) => {
      console.log('auth_user', data)
      if (data) {
        setAuth(data)

        localStorage.setItem('userId', data.user_id);
        setUserId(data.user_id)
        socket.emit('user_login', data)

        socket.emit('get_groups', data)
      } else {
        navigate("/", { replace: true })
      }

    })

    socket.on('user_login', (data) => {

    })

    return (() => {
      socket.on('send_test_server', (data) => {
        console.log(data)
      });
    })
  }, [socket])


  return { auth }
}