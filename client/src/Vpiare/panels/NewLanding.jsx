import React, { useEffect, useState } from 'react';
import {
    FormLayout,
    Input,
    Checkbox,
    FormItem,
    Textarea,
    File,
    Button,
    PanelHeader,
} from "@vkontakte/vkui";
import { Icon24Document } from '@vkontakte/icons';
import "@vkontakte/vkui/dist/vkui.css";
const { io } = require("socket.io-client");
const socket = io.connect('http://localhost:3001/');

const NewLanding = ({ go, land, landings }) => {

    const [allLand, setAllLand] = useState('');
    const id = window.location.href.split('_').slice(-1).join('').split('-')[0];
    const user = window.location.href.split('_').slice(-1).join('').split('-');
    const dbInfo = {
        db: `u${user[1]}_g${user[0]}`
    }

    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 8;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
       }

    const [form, setForm] = useState({
        landingFile: '',
        landingFileName: '',
        landingTitle: '',
        landingText: '',
        landingSubs: true,
        landingUsers: '',
        landingLink: ``,
        landingTextButton: 'Подписаться',
        landingLinkButton: 'https://vk.com/im?sel=-181642819',
        landingUnicId: password,
    });

    const [img, setImg] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.landingFile !== '' && form.landingTitle !== '' && form.landingText !== '') {
            console.log(allLand)
            const newForm = {...form, landingLink: `https://vk.com/app51427952#land=${allLand + 1}_${user[0]}-${user[1]}`}
            go('DemoLanding')
            land(newForm)
        }
    }

    useEffect(() => {

         socket.emit('get_landings', dbInfo)
         console.log(dbInfo)

    }, [])

    useEffect(() => {

        socket.on('send_landings', (data) => {
            setAllLand(data.length)
        
        })


   }, [socket])

    useEffect(() => {
        if (Object.keys(landings).length > 0) {

            setForm(landings)

            const reader = new FileReader();
            reader.readAsDataURL(landings.landingFile)

            reader.onload = function () {
                setImg(reader.result)
            };
        }
    }, [landings])

    return (
        <div>
            <PanelHeader mode="primary" >Создание лендинга</PanelHeader>
            <FormLayout onSubmit={(e) => handleSubmit(e)}>
                <FormItem top="Загрузите изображение">
                    <File
                        before={<Icon24Document role="presentation" />}
                        size="l"
                        mode="primary"
                        onChange={(e) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(e.target.files[0])

                            reader.onload = function () {
                                setImg(reader.result)
                            };
                            setForm({ ...form, landingFile: e.target.files[0], landingFileName: e.target.files[0].name, })
                        }}
                    />
                    <div style={{ textAlign: 'left', marginTop: '1rem' }}>
                        <img height="50px" src={img} alt="" />
                        <p>{form.landingFile.name}</p>
                    </div>
                </FormItem>
                <FormItem top="Введите заголовок">
                    <Input placeholder="Заголовок баннера" value={form.landingTitle} name="title" onChange={(e) => setForm({ ...form, landingTitle: e.target.value })} />
                </FormItem>
                <FormItem top="Введите текст">
                    <Textarea placeholder="Текст привлекающий внимание" value={form.landingText} name="text" onChange={(e) => setForm({ ...form, landingText: e.target.value })} />
                </FormItem>
                <FormItem>
                    <Checkbox defaultChecked onChange={() => setForm({ ...form, landingSubs: !form.landingSubs })}>Отображать количество подписавшихся?</Checkbox>
                </FormItem>
                <FormItem top="Текст кнопки">
                    <Input placeholder={form.landingTextButton} name="button" onChange={(e) => setForm({ ...form, landingTextButton: e.target.value })} />
                </FormItem>
                <FormItem top="Ссылка кнопки">
                    <Input value={form.landingLinkButton} name="button" onChange={(e) => setForm({ ...form, landingLinkButton: e.target.value })} />
                </FormItem>

                <FormItem style={{ textAlign: 'center' }}>
                    <Button type="submit" align='center' size="l">Смотреть демо</Button>
                </FormItem>
            </FormLayout>
        </div>
    );
};

export default NewLanding;