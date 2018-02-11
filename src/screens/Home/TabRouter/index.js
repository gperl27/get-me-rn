import React, { Component } from "react";
import { View } from 'react-native';

import {
    Button,
    Text,
    Container,
    Card,
    CardItem,
    Body,
    Content,
    Header,
    Title,
    Left,
    Icon,
    Right,
    Footer,
    FooterTab,
    List,
    ListItem,
} from "native-base";
import { TabNavigator } from "react-navigation";

import UserTasksScreen from './UserTasksScreen';

class HomeScreen extends React.Component {
    render() {
        let items = [];

        for (let i = 0; i < 50; i++) {
            items.push(i);
        }

        return (
            <Container>
                <Content>
                    <List dataArray={items}
                        renderRow={(item) =>
                            <ListItem>
                                <CardItem>
                                    <Body>
                                        <Text>
                                        //Your text here
                                        </Text>
                                    </Body>
                                </CardItem>
                            </ListItem>
                        }>
                    </List>
                </Content>
            </Container>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }
}

const TabRouter = TabNavigator(
    {
        UserTasksScreen: { screen: UserTasksScreen },
        Settings: { screen: SettingsScreen },
    },
    {
        tabBarPosition: "top",
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate("Test")}
                        >
                            <Icon name="bowtie" />
                            <Text>Home</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate("Settings")}
                        >
                            <Icon name="briefcase" />
                            <Text>Detail</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );

        }
    }
);
export default TabRouter;