import React, { useEffect, useState } from 'react';
import {
    View,
    Panel,
    Group,
    List,
    Cell,
    PanelHeader,
    FormLayout,
    Input,
    Checkbox,
    FormItem,
    Textarea,
    File,
    Button,
	SplitLayout,
	SplitCol,
	PanelHeaderBack,
	PanelHeaderButton,
	PanelHeaderContent,
	PanelHeaderContext,
	useAdaptivity, 
	usePlatform,
	ViewWidth,
} from "@vkontakte/vkui";
import { Icon16AddSquareOutline, Icon28AddOutline, Icon16Dropdown, Icon28UsersOutline, Icon24Done, Icon28SettingsOutline,  } from '@vkontakte/icons';
import "@vkontakte/vkui/dist/vkui.css";
const { io } = require("socket.io-client");
const socket = io.connect('http://localhost:3001/');

const Landings = ({go}) => {

    const [landings, setLandings] = useState([]);
    const [contextOpened, setContextOpened] = useState(false);
	const [mode, setMode] = useState("subscriptions");
	const platform = usePlatform();
	const { viewWidth } = useAdaptivity();

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
  

    const id = window.location.href.split('_').slice(-1).join('').split('-')[0];
    const user = window.location.href.split('_').slice(-1).join('').split('-');
    const dbInfo = {
        db: `u${user[1]}_g${user[0]}`
    }



    useEffect(() => {
        socket.emit('get_landings', dbInfo);
    }, [])

    useEffect(() => {
        socket.on('send_landings', (data) => {
            setLandings(data)
        
        });
    }, [socket])

    return (
        <View activePanel="list">
        <Panel id="list">
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
				 Лендинги
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
         
      

            <div className='landingBlock'>
            {landings.map(item => 
                    <div className='landingBlock__item'>
                        <h3>{item.landingTitle}</h3>
                        <p>{item.landingText}</p>
                        <p>{item.landingUsers}</p>
                        <p>{item.landingLink}</p>
                    </div>
                )}
            </div>
 
        </Panel>
    </View>

    );
};

export default Landings;