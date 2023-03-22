import React, { useState, useEffect } from 'react';
import {
	View,
	Panel,
	Group,
	List,
	Cell,
	PanelHeader,
	SplitLayout,
	SplitCol,
	PanelHeaderBack,
	PanelHeaderButton,
	PanelHeaderContent,
	PanelHeaderContext,
	useAdaptivity,
	usePlatform,
	ViewWidth,
	Button,
	Title,
	Text,
	Div,
} from "@vkontakte/vkui";
import { Icon16AddSquareOutline, Icon28AddOutline, Icon16Dropdown, Icon28UsersOutline, Icon24Done, Icon28SettingsOutline, } from '@vkontakte/icons';
import "@vkontakte/vkui/dist/vkui.css";
import bridge from '@vkontakte/vk-bridge';
import img1 from './accept.png';
import img2 from './close.png';
//const { io } = require("socket.io-client");
//const socket = io.connect('http://localhost:3002/');
import { useSocket } from '../../connections/io_connect';


const Home = ({ fetchedUser, go }) => {
  const { socket } = useSocket()
	const [groupId, setGroupId] = useState('');
	const [groupSubs, setGroupSubs] = useState({});
	const [subscribe, setSubscribe] = useState(false);
	const [showPopupSub, setShowPopupSub] = useState(false);
	const [showPopupUnsub, setShowPopupUnsub] = useState(false);
	const [contextOpened, setContextOpened] = useState(false);
	const [mode, setMode] = useState("subscriptions");
	const platform = usePlatform();
	const { viewWidth } = useAdaptivity();
	const [isAdmin, setIsAdmin] = useState(false);
	const [land, setLand] = useState({});
	const [img, setImg] = useState('');
	const typePage = window.location.href.split('#').slice(-1).join('').split('=')[0];

	const toggleContext = () => {
		setContextOpened((prev) => !prev);
	};

	const select = (e) => {
		const mode = e.currentTarget.dataset.mode;
		setMode(mode);
		requestAnimationFrame(toggleContext);
		go(mode)
	};

	const hasHeader = platform !== 'vkcom';
	const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;




	useEffect(() => {

		if (fetchedUser !== null) {
			const id = window.location.href.split('_').slice(-1).join('').split('-')[0];
			const user = window.location.href.split('_').slice(-1).join('').split('-')[1];

			setGroupId(id);
			const groupSubscribers = window.location.href.split('=').slice(-1).join('').split('_')[0];

			const dbInfo = {
				db: `u${user}_g${id}`,
				groupSubscribers: groupSubscribers
			}

			if (typePage === 'm') {

				socket.emit('get_userGroups', dbInfo)
				socket.emit('get_userInfo', { db: `u${user}_g${id}`, user: fetchedUser.id })
			} else if (typePage === 'land') {

				
				socket.emit('get_landings', dbInfo );

			}
			socket.emit('check_admin', fetchedUser.id)

			
		}

	}, [fetchedUser]);

	useEffect(() => {
		const func = () => {
			if (fetchedUser !== null && groupSubs.textGroup !== undefined) {
				let message = groupSubs.textGroup;

				let NewData = new Date();
				let options = { weekday: 'narrow', year: 'numeric', month: '2-digit', day: 'numeric' };
				let regData = NewData.toLocaleString(options).split(',').join('');

				const variables = {
					'%name%': fetchedUser.first_name ? fetchedUser.first_name : '',
					'%fullName%': fetchedUser.first_name && fetchedUser.last_name ? fetchedUser.first_name + ' ' + fetchedUser.last_name : '',
					'%id%': fetchedUser.id ? fetchedUser.id : '',
					'%city%': fetchedUser.city ? fetchedUser.city.title : '',
					'%country%': fetchedUser.country ? fetchedUser.country.title : '',
					'%date%': `${regData}`,
				}

				for (let key of Object.keys(variables)) {
					let regx = new RegExp(key, 'g')
					message = message.replace(regx, variables[key])

				}

				setGroupSubs({ ...groupSubs, textGroup: message })
			}
		}


		func();

		return (() => {

			func();

		})

	}, [])


	useEffect(() => {
		const groupSubscribers = window.location.href.split('=').slice(-1).join('').split('_')[0];

		socket.on('send_userGroups', (data) => {

			data.forEach(element => {
				if (String(element.idGroup) === groupSubscribers) {
					setGroupSubs(element)
				}

			});
		})

		socket.on('send_userInfo', (data) => {
			if (data) {
				const dataSubs = data.subscriptions.split(' ').join('').split(',')
				if (dataSubs.includes(groupSubscribers)) {
					setSubscribe(true)
				}
			}
		})

		socket.on('checked_admin', (data) => {
			if (data === 1) {
				setIsAdmin(true)
			} else {
				setIsAdmin(false)
			}
		})


		socket.on('send_landings', (data) => {
			data.forEach(element => {
				if (String(element.id) === groupSubscribers) {
					
					setImg(`data:image/jpeg;base64,${element.fileData}`)
					setLand(element)

				}

			});

		});


	}, [socket])


	useEffect(() => {
		if(Object.keys(land).length > 0) {
			if (land.landingUsers.split(',').includes(String(fetchedUser.id))) {
				setSubscribe(true)
			}
		} 
		
		
	}, [land])



	const handleSub = (e) => {
		e.preventDefault()

		bridge.send("VKWebAppAllowMessagesFromGroup", { "group_id": Number(groupId), "key": "dBuBKe1kFcdemzB" });
		const id = window.location.href.split('_').slice(-1).join('').split('-')[0];
		const user = window.location.href.split('_').slice(-1).join('').split('-')[1];
		const groupSubscribers = window.location.href.split('=').slice(-1).join('').split('_')[0];
      	socket.emit('add_newSubscriber', { db: `u${user}_g${id}`, user: fetchedUser.id, subId: groupSubscribers })



	  /*let message = groupSubs.autoMessage;

		let NewData = new Date();
		let options = { weekday: 'narrow', year: 'numeric', month: '2-digit', day: 'numeric' };
		let regData = NewData.toLocaleString(options).split(',').join('');

		const variables = {
			'%name%': fetchedUser.first_name ? fetchedUser.first_name : '',
			'%fullName%': fetchedUser.first_name && fetchedUser.last_name ? fetchedUser.first_name + ' ' + fetchedUser.last_name : '',
			'%id%': fetchedUser.id ? fetchedUser.id : '',
			'%city%': fetchedUser.city ? fetchedUser.city.title : '',
			'%country%': fetchedUser.country ? fetchedUser.country.title : '',
			'%date%': `${regData}`,
		}

		for (let key of Object.keys(variables)) {
			let regx = new RegExp(key, 'g')
			message = message.replace(regx, variables[key])
		}
*/

		//socket.emit('send_firstMessage', { db: `u${user}_g${id}`, user: fetchedUser.id, subId: groupSubscribers, time: groupSubs.dateActive, message: message })
		setSubscribe(true);
		setShowPopupSub((prev) => !prev);
	}

	const handleUnsub = (e) => {
		e.preventDefault()
		const id = window.location.href.split('_').slice(-1).join('').split('-')[0];
		const user = window.location.href.split('_').slice(-1).join('').split('-')[1];
		const groupSubscribers = window.location.href.split('=').slice(-1).join('').split('_')[0];

		socket.emit('delete_subGroup', { db: `u${user}_g${id}`, user: fetchedUser.id, subId: groupSubscribers })
		setSubscribe(false);
		setShowPopupUnsub((prev) => !prev)
	}


	const handleLandSub = (e) => {
		e.preventDefault()
		const id = window.location.href.split('_').slice(-1).join('').split('-')[0];
		const user = window.location.href.split('_').slice(-1).join('').split('-')[1];
		socket.emit('add_newLandSubscriber', { db: `u${user}_g${id}`, user: fetchedUser.id, landingId: land.landingUnicId })
		setSubscribe(true);
	}


	const handleLandUnsub = (e) => {
		e.preventDefault()
		const id = window.location.href.split('_').slice(-1).join('').split('-')[0];
		const user = window.location.href.split('_').slice(-1).join('').split('-')[1];

		socket.emit('delete_landSubscriber', { db: `u${user}_g${id}`, user: fetchedUser.id, landingId: land.landingUnicId })
		setSubscribe(false);
	}


	return (

		<SplitLayout
			style={{ justifyContent: "center" }}
			header={hasHeader && <PanelHeader separator={false} />}
		>
			<SplitCol
				animate={!isDesktop}
				spaced={isDesktop}
				width={isDesktop ? "560px" : "100%"}
				maxWidth={isDesktop ? "560px" : "100%"}
			>
				<View activePanel="context2">
					<Panel id="context2">
						<PanelHeader
							after={
								<PanelHeaderButton>
									<Icon28AddOutline />
								</PanelHeaderButton>
							}
						>
							<PanelHeaderContent
								aside={
									<Icon16Dropdown
										style={{
											transform: `rotate(${contextOpened ? "180deg" : "0"})`,
										}}
									/>
								}
								onClick={toggleContext}
							>
								Оформление подписки
							</PanelHeaderContent>
						</PanelHeader>
						<PanelHeaderContext opened={contextOpened} onClose={toggleContext}>
							<List>
								<Cell
									after={
										mode === "landings" ? (
											<Icon24Done fill="var(--vkui--color_icon_accent)" />
										) : null
									}
									onClick={select}
									data-mode="Landings"
								>
									Лендинги
								</Cell>
								<Cell
									after={
										mode === "newLanding" ? (
											<Icon24Done fill="var(--vkui--color_icon_accent)" />
										) : null
									}
									onClick={select}
									data-mode="NewLanding"
								>
									Создать лендинг
								</Cell>
							</List>
						</PanelHeaderContext>
						<Group>

							{typePage === 'land' && Object.keys(land).length > 0
								?

								<div>
									<figure className="landingImg">
										<img src={img} alt="" />
									</figure>
									<Div className="landingBody">
										<Title className="title">{land.landingTitle}</Title>
										<Text weight="3" className="text">{land.landingText}</Text>
										<Text>{land.landingSubs ? `Подписчиков: ${land.landingUsers.split(',').filter(item => item.length > 0).length}` : ''}</Text>
										{subscribe
											?
											<Button size="l" className="vk-app-button" onClick={handleLandUnsub}>Отписаться</Button>
											:
											<Button size="l" className="vk-app-button" onClick={handleLandSub}>{land.landingTextButton}</Button>
										}

									</Div>
								</div>


								:

								<div className="vk-app">
									<h1>{groupSubs.titleGroup}</h1>
									<div className='text'>{groupSubs.textGroup}</div>
									<div className={showPopupSub ? "popupSub" : "popupSub d-none"}>
										<div className="popupSub-inner">
											<div className="popup-close" onClick={() => setShowPopupSub(false)}>Закрыть</div>
											<img src={img1} />
											<h2>Вы успешно подписаны</h2>
											<p>{groupSubs.textPopupSub}</p>
											{groupSubs.pageSub ? <a href={groupSubs.pageSub} target="_blank" className='popup-button'>{groupSubs.textButtonSub}</a> : <a onClick={() => setShowPopupSub(false)} className='popup-button'>OK</a>}
										</div>
									</div>
									<div className={showPopupUnsub ? "popupUnsub" : "popupUnsub d-none"}>
										<div className="popupUnsub-inner">
											<div className="popup-close" onClick={() => setShowPopupUnsub(false)}>Закрыть</div>
											<img src={img2} />
											<h2>Вы отписаны</h2>
											<p>{groupSubs.textPopupUnsub}</p>
											{groupSubs.pageUnsub ? <a href={groupSubs.pageUnsub} className='popup-button'>{groupSubs.textButtonUnsub}</a> : <a onClick={() => setShowPopupUnsub(false)} className='popup-button'>OK</a>}
										</div>
									</div>


									{subscribe
										?
										<div className="vk-app-button"><a href="" onClick={handleUnsub}>{groupSubs.textButtonTwo}</a></div>
										:
										<div className="vk-app-button"><a href="" onClick={handleSub}>{groupSubs.textButtonOne}</a></div>
									}
								</div>


							}
						</Group>
					</Panel>
				</View>
			</SplitCol>
		</SplitLayout>
	);
};


export default Home;
