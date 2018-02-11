import React from 'react';
import axios from 'axios';
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import {
    Container, Content, Header, Left, Body, Right, Button, Icon, Title, Text, Form, Item, Input, List,
    ListItem,
} from 'native-base';
import { StyleSheet, Platform, StatusBar, View } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import { Constants, Location, Permissions } from 'expo'

class SearchPlaces extends React.Component {
    state = {
        location: null,
        errorMessage: null,
        results: null,
    };

    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });

        const q = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=500&type=restaurant&&key=AIzaSyDkoK9EBOFnhk8Ny1u8HqsMhDyPCKBYgW4`

        console.log(q, location);

        const results = await axios.get(q)

        console.log(results.data.results, 'results');
        this.setState({ results: results.data.results })
    };


    render() {
        const { results } = this.state;

        return (
            <View>
                <Item regular>
                    <Input placeholder='What do you need?' />
                </Item>
                {results ?
                    results.length > 0 ?
                        <List dataArray={results}
                            renderRow={(result) =>
                                <ListItem>
                                    <Body>
                                        <Text>Google Result</Text>
                                    </Body>
                                </ListItem>
                            }>
                        </List> : null
                    : null
                }
            </View>
        );
    }
}

export default SearchPlaces;