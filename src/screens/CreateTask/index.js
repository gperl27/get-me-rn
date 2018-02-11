import React from 'react';
import axios from 'axios';
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import {
    Container, Content, Header, Left, Body, Right, Button, Icon, Title, Text, Form, Item, Input, List,
    ListItem,
} from 'native-base';
import { StyleSheet, Platform, StatusBar, Modal, View } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import { Constants, Location, Permissions } from 'expo';

import { calculateDistance } from '../../util/geolocation';
import { submitCreateTask } from '../../modules/tasks'

const CustomInput = ({ input, placeholder, keyboardType }) => {
    return (
        <Item>
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

    // API Reference: https://developers.google.com/places/web-service/search
    search = async text => {
        const { location } = this.state;

        console.log('searching for: ', text);

        if (location) {
            const query = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=500&keyword=${text}&key=AIzaSyDkoK9EBOFnhk8Ny1u8HqsMhDyPCKBYgW4`

            const results = await axios.get(query)

            console.log(results);

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
        const { results, location } = this.state;
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
                        <Title>Header</Title>
                    </Body>
                </Header>
                <Content>
                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}
                    >
                        <Container>
                            <Header searchBar>
                                <Item regular>
                                    <Input
                                        placeholder='What do you need?'
                                        onChangeText={(text) => this.search(text)}
                                    />
                                </Item>
                            </Header>
                            <Content>
                                {results ?
                                    results.length > 0 ?
                                        <List dataArray={results}
                                            renderRow={(result) =>
                                                <ListItem>
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
                    <Button onPress={() => this.openModal()}>
                        <Text>what do you need?</Text>
                    </Button>
                    <Form>
                        <Field
                            name='title'
                            component={CustomInput}
                            placeholder='Title'
                        />
                        <Field
                            name='instructions'
                            component={CustomInput}
                            placeholder='Instructions'
                        />
                        <Field
                            name='offer'
                            component={CustomInput}
                            placeholder='Offer'
                            keyboardType='numeric'
                        />
                        <Button
                            transparent
                            onPress={this.props.handleSubmit(this.onSubmit)}
                        >
                            <Text>Submit</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    appHeaderFix: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    },
    modalContainer: {
        // flex: 1,
        // justifyContent: 'center',
        // backgroundColor: 'grey',
    },
    innerContainer: {
        // alignItems: 'center',
    },
});

const mapDispatchToProps = dispatch => bindActionCreators({
    submitCreateTask,
}, dispatch)

export default compose(
    connect(null, mapDispatchToProps),
    reduxForm({ form: 'create-task' }),
)(CreateTaskScreen)