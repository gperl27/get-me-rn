import { GOOGLE_PLACES_KEY } from 'react-native-dotenv'
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

import { submitCreateTask } from '../../modules/tasks'

import PlacesListModal from './PlacesListModal'

const CustomInput = ({
    styles,
    inputStyles,
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
                style={inputStyles}
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
        checkoutModal: false,
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
    };

    handleChooseLocation = result => {
        this.setState({ locationChoice: result })
        this.closeModal();
    }

    // API Reference: https://developers.google.com/places/web-service/search
    search = async text => {
        const { location } = this.state;

        if (location) {
            const query = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=500&keyword=${text}&key=${GOOGLE_PLACES_KEY}`

            const results = await axios.get(query)

            this.setState({ results: results.data.results })
        }
    }

    onSubmit = values => {
        // this.props.submitCreateTask(values);
        this.openCheckout()
    }

    openModal = () => {
        this.setState({ modalVisible: true });
    }

    closeModal = () => {
        this.setState({ modalVisible: false });
    }

    openCheckout = () => {
        this.setState({ checkoutModal: true });
    }

    closeCheckout = () => {
        this.setState({ checkoutModal: false });
    }


    render() {
        const { navigation } = this.props;
        const { results, location, locationChoice, modalVisible } = this.state;

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
                        visible={this.state.checkoutModal}
                        animationType={'fade'}
                        onRequestClose={() => this.close()}
                    >
                        <View>
                            <Text>Confirm Stub</Text>
                            <Button
                                onPress={() => this.close()}
                                title="Close modal"
                            >
                            </Button>
                        </View>
                    </Modal>


                    <PlacesListModal
                        results={results}
                        location={location}
                        visible={modalVisible}
                        search={this.search}
                        handleChooseLocation={this.handleChooseLocation}
                        closeModal={this.closeModal}
                    />
                    <Form style={{ width: '100%' }}>
                        <H2 style={{ textAlign: 'center', marginBottom: 25 }}>I'll give you</H2>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <H1>$</H1>
                            <Field
                                styles={{ width: 100 }}
                                inputStyles={{ fontSize: 24 }}
                                name='offer'
                                component={CustomInput}
                                placeholder="10.00"
                                keyboardType='numeric'
                            />
                        </View>
                        <Field
                            styles={{ marginTop: 25, marginBottom: 25, borderRadius: 8 }}
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
                                        secondary
                                    >
                                        <Text>Search Nearby</Text>
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