import {useEffect, useState} from 'react';
import {useSocket} from '../connections/io_connect';

export function useGroups() {

  const {socket} = useSocket()

  const [groupsVK, setGroupsVK] = useState({items: [], count: 0});
  const [groupsIdsInfo, setGroupsIdsInfo] = useState({});
  const [groupsApp, setGroupsApp] = useState({});
  const [groupsIdsInclude, setGroupsIdsInclude] = useState([]);

  const [groupsError, setGroupsError] = useState();
  const [groupsSuccess, setGroupsSuccess] = useState();



  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  useEffect(() => {
    socket.emit('get_groups_vk')

    //socket.emit('send_test_message')

    socket.on('set_groups_vk', (data) => {
      setGroupsVK(data)
    })

    socket.on('set_groups_ids', (data) => {
      setGroupsIdsInfo(data)
    })

    socket.on('set_groups_ids_include', (data) => {
      setGroupsIdsInclude(data)
    })

    socket.on('set_groups_app', (data) => {
      setGroupsApp(data)
    })

    socket.on('set_group_id', (data) => {
      setGroupsIdsInfo({...groupsIdsInfo, ...{[data.id] : data}})
    })


    socket.on('save_group', (data) => {
      if (userId) {
        data.id = userId
        socket.emit('save_group', data)
      }
    })

    socket.on('group_error', (data) => {
      setGroupsError(data)
    })

    socket.on('group_success', (data) => {
      setGroupsSuccess(data)
    })

  }, [socket])


  return {groupsVK, groupsIdsInfo, groupsApp, groupsIdsInclude, groupsError, groupsSuccess}
}