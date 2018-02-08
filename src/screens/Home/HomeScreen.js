import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
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

import TabRouter from '../../TabRouter'


class HomeScreen extends React.Component {
    render() {
        return (
            <Container>
                <Header />
                <TabRouter />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    appHeaderFix: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
});

export default HomeScreen