import {createContext} from 'react'

export const GroupsContext = createContext({
  GroupsVK: {items: [], count: 0},
  GroupsIdsInfo: {},
  GroupsApp: {},
  GroupsIdsInclude: []
})