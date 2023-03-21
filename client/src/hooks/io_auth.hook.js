import { useEffect, useState } from 'react';
import { useSocket } from '../connections/io_connect';
import { useNavigate } from "react-router-dom";


export function useAuth() {
  const navigate = useNavigate();
  const { socket } = useSocket()
  const code = window.location.href.split('=')[1];
  const [auth, setAuth] = useState();
  const [token, setToken] = useState();

  const [isAuth, setIsAuth] = useState();
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  useEffect(() => {
    socket.emit('test_server')
    if (code) {
      socket.emit('get_access_token', code)
    }

    if (userId !== null && !code) {
      socket.emit('get_user_info', userId)
    }
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    socket.on('send_test_server', (data) => {
      console.log(data)
    })

    socket.on('logout', () => {
      localStorage.clear();
      navigate(`/`);
    })

    socket.on('login', (data) => {
      console.log('login',data)
      setAuth(data)
      setToken(data.access_token)
      setIsAuth(true)

    })

    socket.on('go_cabinet', (data) => {
      if(data.user_id) {
        localStorage.setItem('userId', data.user_id);
        setUserId(data.user_id)
      }

      navigate("/cabinet", { replace: true })
    })






    socket.on('access_token_old', (data) => {
      if (!data) {
        navigate("/", { replace: true })
      }

      if (data.access_token) {
        console.log('accss', data)
        socket.emit('auth_user', data)
        navigate("/cabinet", { replace: true })
      }
      if (!data.access_token) {
        socket.emit('get_user', userId)
        socket.emit('save_group', data)
        navigate("/cabinet", { replace: true })
      }


    })


    return (() => {
      socket.on('send_test_server', (data) => {
        console.log(data)
      });
    })
  }, [socket])


  return { auth, token, isAuth }
}