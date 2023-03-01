import React from 'react';
import { client_id, redirect_url, user_access_rights } from '../../app-setting';

const cabinet_link = `https://oauth.vk.com/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&scope=${user_access_rights}&display=page`

const Main = () => {
  return (
      <div className="Main">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">V-piare</a>
            <div className="d-flex">
              <a href={cabinet_link}>Войти</a>
            </div>
          </div>
        </nav>
        <div className="container  text-center">
          <main className="Main__content">
            <div className="Main__content-prev">
              <h1>
                Работайте со своими клиентами<br />
                вконтакте 24/7
              </h1>
              <h3>
                Настройте целевые рассылки и чат-ботов<br />
                в своих сообществах ВК
              </h3>
              <a className={'btn btn-success'} href={cabinet_link}>
                Перейти в кабинет
              </a>
            </div>
          </main>
          <footer className="Main__footer">

          </footer>
        </div>
      </div>
  )
}

export default Main;

