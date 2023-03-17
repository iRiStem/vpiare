import React from 'react';

const app_link = process.env.REACT_APP_MAIN_URL;

const MainBanner = () => {
    return (
        <div style={{padding: '1rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <a href={app_link} target="_blank" style={{textDecoration: 'none', color: 'black'}}><h1>Подключить группу</h1></a>
        </div>
    );
};

export default MainBanner;