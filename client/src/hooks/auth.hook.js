import {useEffect, useState} from 'react';

export function useAuth() {
  const code = window.location.href.split('=')[1];
  const [auth, setAuth] = useState();

  useEffect(() => {
    if (code) {
      userAuth()
    }
    // eslint-disable-next-line
  }, [])


  const userAuth = async() => {
    setAuth({
      first_name: 'RisHa',
      last_name: 'Test'
    })
  }

  return { auth }
}