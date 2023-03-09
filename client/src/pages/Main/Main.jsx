import React from 'react';

const cabinet_link = `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=${process.env.REACT_APP_USER_ACCESS_RIGTHS}&display=page`

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

