import React from 'react';
import {
    View,
    Panel,
    Group,
    List,
    Cell,
    PanelHeader,
} from "@vkontakte/vkui";
import { Icon16AddSquareOutline } from '@vkontakte/icons';
import "@vkontakte/vkui/dist/vkui.css";

const Main = ({ go }) => {


    return (
        <View activePanel="list">
            <Panel id="list">
                <PanelHeader>Главная</PanelHeader>
                <Group>
                    <List>
                        <Cell onClick={() => go('Landings')}>
                            Лендинги
                        </Cell>
                        <Cell onClick={() => go('NewLanding')}>
                            Создать лендинг
                        </Cell>
                    </List>
                </Group>
            </Panel>
        </View>

    );
};

export default Main;