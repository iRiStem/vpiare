import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';


import Home from './panels/Home';
import Main from './panels/Main';
import NewLanding from './panels/Main';
import DemoLanding from './panels/Main';
import MainBanner from './panels/MainBanner';
import Landings from './panels/Main';

// Init VK  Mini App
bridge.send("VKWebAppInit");

const Goodly = () => {

	const [activePanel, setActivePanel] = useState('mainBanner');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [landings, setLandings] = useState({});



	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo')
			setUser(user);
			setPopout(null);
		}
		fetchData();
		const id = window.location.href.split('_').slice(-1).join('').split('-');
		if (id.filter(item => Number(item)).length > 0) {
			setActivePanel('home')
		}

		return (() => {
			fetchData();
		})

	}, []);

	const go = e => {
		setActivePanel(e);
	};

	const land = (form) => {
		setLandings(form);
	}

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<MainBanner id='mainBanner' go={go} />
								<Home id='home' fetchedUser={fetchedUser} go={go}/>
								<Main id='main' fetchedUser={fetchedUser} go={go} />
								<NewLanding id='NewLanding' fetchedUser={fetchedUser} go={go} land={land} landings={landings} />
								<DemoLanding id='DemoLanding' fetchedUser={fetchedUser} go={go} landings={landings} />
								<Landings id='Landings' fetchedUser={fetchedUser} go={go} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
};

export default Goodly;
