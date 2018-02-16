import React from "react";
import * as firebase from 'firebase';
import { AppRegistry, Image, StatusBar } from "react-native";
import {
    Button,
    Text,
    Container,
    List,
    ListItem,
    Content,
    Icon
} from "native-base";

export default class SideBar extends React.Component {
    render() {
        const routes = [
            {
                text: "Home",
                onPress: () =>  this.props.navigation.navigate("Home")
            },
            {
                text: "Payments",
                onPress: () =>  this.props.navigation.navigate("Payments")
            },
            {
                text: "Log Out",
                onPress: () =>  firebase.auth().signOut()
            },
        ];

        return (
            <Container>
                <Content>
                    <Image
                        source={{
                            uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
                        }}
                        style={{
                            height: 120,
                            alignSelf: "stretch",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    />
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={data.onPress}
                                >
                                    <Text>{data.text}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
}