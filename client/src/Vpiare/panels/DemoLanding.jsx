import React, { useEffect, useState } from 'react';
import {
    Button,
    Title,
    Text,
    Div,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
//import '@vkontakte/vkui/dist/fonts.css'
const { io } = require("socket.io-client");
const socket = io.connect('http://localhost:3001/');


const DemoLanding = ({ go, landings }) => {

    const [img, setImg] = useState('')

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(landings.landingFile)

        reader.onload = function () {

            setImg(reader.result)
        };
    }, [landings])

    const handleSave = () => {
        const arr = window.location.href.split('=').slice(-1).join('').split('_')[1].split('-');
        const db = `u${arr[1]}_g${arr[0]}`;
        let newLanding = {
            db: db,
            landing: landings
        }


        socket.emit('add_newLanding', newLanding)
        go('main')




    }


    const handleCancel = () => {
        go('NewLanding')
    }


    return (
        <div>
            <figure className="landingImg">
                <img src={img} alt="" />
            </figure>
            <Div className="landingBody">
                <Title className="title">{landings.landingTitle}</Title>
                <Text weight="3" className="text">{landings.landingText}</Text>
                <Text>{landings.landingSubs ? 'Подписчиков: 0' : ''}</Text>
                <Button size="l">{landings.landingTextButton}</Button>
            </Div>


            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem' }}>
                <Button size='l' appearance="negative" onClick={handleCancel}>
                    Вернуться
                </Button>
                <Button size='l' appearance="positive" onClick={handleSave}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default DemoLanding;