import React from 'react';
import {
    Container, Content, Header, Left, Body, Right, Button, Icon, Title, Text, Form, Item, Input, List,
    ListItem, Card, CardItem, H1, H2, H3,
} from 'native-base';
import { StyleSheet, Platform, StatusBar, Modal, View } from 'react-native'
import { calculateDistance } from '../../util/geolocation';

const PlacesListModal = ({
    visible,
    closeModal,
    search,
    results,
    handleChooseLocation,
    location,
}) => (
        <Modal
            visible={visible}
            animationType={'slide'}
            onRequestClose={() => closeModal()}
        >
            <Container>
                <Header searchBar rounded>
                    <Item regular>
                        <Icon name='search' />
                        <Input
                            placeholder='Headphones, tissues, McDonalds...'
                            onChangeText={(text) => search(text)}
                        />
                    </Item>
                </Header>
                <Content>
                    {results ?
                        results.length > 0 ?
                            <List dataArray={results}
                                renderRow={(result) =>
                                    <ListItem button onPress={() => handleChooseLocation(result)}>
                                        <Body>
                                            <Text>{result.name}</Text>
                                            <Text>{result.vicinity}</Text>
                                            {
                                                location ?
                                                    <Text>
                                                        {
                                                            calculateDistance(
                                                                location.coords.latitude,
                                                                location.coords.longitude,
                                                                result.geometry.location.lat,
                                                                result.geometry.location.lng,
                                                            ).toFixed(1)
                                                        }
                                                        &nbsp;mi
                                            </Text> : null
                                            }
                                        </Body>
                                    </ListItem>
                                }>
                            </List> : null
                        : null
                    }
                </Content>
            </Container>
        </Modal>
    )

export default PlacesListModal;