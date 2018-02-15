import React from 'react';
import axios from 'axios';
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import {
    Container, Content, Header, Left, Body, Right, Button, Icon, Title, Text, Form, Item, Input, List,
    ListItem, Card, CardItem, H1, H2, H3,
} from 'native-base';
import { StyleSheet, Platform, StatusBar, Modal, View } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import { Constants, Location, Permissions } from 'expo';

import { Row, Col, Grid } from 'react-native-easy-grid';

import { calculateDistance } from '../../util/geolocation';
import { submitCreateTask } from '../../modules/tasks'

const CustomInput = ({
    styles,
    input,
    placeholder,
    keyboardType,
    regular
 }) => {
    return (
        <Item
            regular={regular}
            style={styles}
        >
            <Input
                {...input}
                placeholder={placeholder}
                keyboardType={keyboardType || 'default'}
            />
        </Item>
    )
}

class CreateTaskScreen extends React.Component {
    state = {
        locationChoice: null,
        location: null,
        errorMessage: null,
        results: null,
        modalVisible: false,
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

        // const q = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=500&key=AIzaSyDkoK9EBOFnhk8Ny1u8HqsMhDyPCKBYgW4`

        // console.log(q, location);

        // const results = await axios.get(q)

        // console.log(results.data.results, 'results');
        // this.setState({ results: results.data.results })
    };

    handleChooseLocation = result => {
        this.setState({ locationChoice: result })
        this.closeModal();
    }

    // API Reference: https://developers.google.com/places/web-service/search
    search = async text => {
        const { location } = this.state;

        console.log('searching for: ', text);

        if (location) {
            const query = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=500&keyword=${text}&key=AIzaSyDkoK9EBOFnhk8Ny1u8HqsMhDyPCKBYgW4`

            const results = await axios.get(query)

            this.setState({ results: results.data.results })
        }
    }

    onSubmit = values => {
        this.props.submitCreateTask(values);
    }

    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }


    render() {
        const { navigation } = this.props;
        const { results, location, locationChoice } = this.state;
        // console.log(this.props.results, 'RESUTLS');
        // console.log(this.props);
        return (
            <Container style={styles.appHeaderFix}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    </Body>
                </Header>
                <Content padder>
                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}
                    >
                        <Container>
                            <Header searchBar>
                                <Item regular>
                                    <Input
                                        placeholder='Headphones, tissues, McDonalds...'
                                        onChangeText={(text) => this.search(text)}
                                    />
                                </Item>
                            </Header>
                            <Content>
                                {results ?
                                    results.length > 0 ?
                                        <List dataArray={results}
                                            renderRow={(result) =>
                                                <ListItem button onPress={() => this.handleChooseLocation(result)}>
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
                                <Button
                                    onPress={() => this.closeModal()}
                                    title="Close modal"
                                >
                                </Button>
                            </Content>
                        </Container>
                    </Modal>
                    <Form style={{ width: '100%' }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <H1>$</H1>
                            <Field
                                styles={{ width: 100 }}
                                name='offer'
                                component={CustomInput}
                                placeholder="I'll give you"
                                keyboardType='numeric'
                            />
                        </View>
                        <Field
                            styles={{ marginTop: 25, marginBottom: 25 }}
                            name='instructions'
                            component={CustomInput}
                            placeholder='If you get me...'
                            regular
                        />
                        <H2 style={{ textAlign: 'center' }}>From</H2>
                        <View style={{ marginTop: 25, marginBottom: 25 }}>
                            {
                                locationChoice ?
                                    <Card onPress={() => this.openModal()}>
                                        <CardItem header>
                                            <Left>
                                                <Body>
                                                    <Text>{locationChoice.name || 'Unknown'}</Text>
                                                    <Text>{locationChoice.vicinity || 'Unknown'}</Text>
                                                </Body>
                                            </Left>
                                            <Right>
                                                <Button
                                                    transparent
                                                    onPress={() => this.openModal()}
                                                >
                                                    <Icon name='create' />
                                                </Button>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                    :
                                    <Button
                                        onPress={() => this.openModal()}
                                        block
                                        light
                                    >
                                        <Text>Nearby</Text>
                                    </Button>
                            }
                        </View>

                        {
                            locationChoice ?
                                <Button
                                    block
                                    primary
                                    onPress={this.props.handleSubmit(this.onSubmit)}
                                >
                                    <Text>Get Me</Text>
                                </Button>
                                : null
                        }
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    appHeaderFix: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
});

const mapDispatchToProps = dispatch => bindActionCreators({
    submitCreateTask,
}, dispatch)

export default compose(
    connect(null, mapDispatchToProps),
    reduxForm({ form: 'create-task' }),
)(CreateTaskScreen)