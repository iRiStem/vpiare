import {createContext} from 'react'

export const AuthContext = createContext({
  auth: null, token: null, isAuth: false
})