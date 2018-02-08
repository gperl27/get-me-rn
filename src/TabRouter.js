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
} from "native-base";
import { TabNavigator } from "react-navigation";

class HomeScreen extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <Text>
                        home baby
                        </Text>
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
        Test: { screen: HomeScreen },
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