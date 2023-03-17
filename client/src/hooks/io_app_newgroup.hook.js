import {useEffect, useState} from 'react';
import {useSocket} from '../connections/io_connect';

export function useNewAppGroup() {

  const {socket} = useSocket()



  const newState = {
    //linkGroup: `https://vk.com/app51427952#m=${groupList.length + 1}_${groupId}-${user}`,
    //nameGroup: groupName,
    //titleGroup: groupTitle,
    /*bannerGroup: groupBanner,
    textButtonOne: textButtonOne.length > 0 ? textButtonOne : 'Подписаться',
    textButtonTwo: textButtonTwo.length > 0 ? textButtonTwo : 'Отписаться',
    textGroup: groupText,
    pageSub: pageSub,
    pageUnsub: pageUnsub,
    autoMessage: autoMessage,
    textPopupSub: textPopupSub,
    textPopupUnsub: textPopupUnsub,
    textButtonSub: textButtonSub,
    textButtonUnsub: textButtonUnsub,
    dateCreate: regData,
    dateActive: showTimer ? JSON.stringify(date) : '',*/
  }

  useEffect(() => {
  })

  const createNewGroup = async(form, db) => {
    socket.emit('new_group', form, db)
  }

  return { createNewGroup }
}