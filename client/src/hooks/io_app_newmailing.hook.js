import {useEffect, useState} from 'react';
import {useSocket} from '../connections/io_connect';

export function useNewAppMailing() {

  const {socket} = useSocket()

  useEffect(() => {
  })

  const sendNewMailing = async(form, db) => {
    socket.emit('send_mailing', form, db)
  }

  return { sendNewMailing }
}