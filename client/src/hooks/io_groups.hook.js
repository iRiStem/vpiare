import {useEffect, useState} from 'react';
import {useSocket} from '../connections/io_connect';

export function useGroups() {

  const {socket} = useSocket()

  const [groupsVK, setGroupsVK] = useState({items: [], count: 0});
  const [groupsIdsInfo, setGroupsIdsInfo] = useState({});
  const [groupsApp, setGroupsApp] = useState({});


  useEffect(() => {
    socket.emit('get_groups_vk')

    //socket.emit('send_test_message')

    socket.on('set_groups_vk', (data) => {
      setGroupsVK(data)
    })

    socket.on('set_groups_ids', (data) => {
      setGroupsIdsInfo(data)
    })

    socket.on('set_groups_app', (data) => {
      setGroupsApp(data)
    })

    socket.on('set_group_id', (data) => {
      setGroupsIdsInfo({...groupsIdsInfo, ...{[data.id] : data}})
    })

  }, [socket])


  return {groupsVK, groupsIdsInfo, groupsApp}
}