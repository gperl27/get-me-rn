import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { StyleSheet, Text, View, Button } from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

import HomeScreen from './Home';
import DetailsScreen from './Details';
import LoginScreen from './Login';

import {
    loggedIn,
    loggedOut,
} from './modules/auth';

const AuthStack = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailsScreen,
        },
    }
);

const LoginStack = StackNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
    }
)

class Router extends React.Component {
    componentDidMount() {
        // axios.get(
        //   'http://af208768.ngrok.io')
        //   .then(res => console.log(res.data, 'res'))
        //   .catch(err => {
        //     console.log(err);
        //   })
        const { loggedIn, loggedOut } = this.props;

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                loggedIn(user);

                user.getIdToken().then(function (idToken) {
                    axios.defaults.headers.common['Authorization'] = idToken;
                    axios.get(
                        'http://43c7591f.ngrok.io/auth_user', { params: { user } })
                        .then(res => console.log(res.data, 'res'))
                        .catch(err => {
                            console.log(err);
                        })
                });

            } else {
                delete axios.defaults.headers.common['Authorization'];
                loggedOut();
            }
        });
    }

    async loginWithGoogle() {
        const { type, idToken } = await Expo.Google.logInAsync({
            androidClientId: '665105818131-mth049uaf78vdforfma5immdcb174psf.apps.googleusercontent.com',
            iosClientId: '665105818131-mj94uos302jrhad6udlgk164hbhacjtf.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (type === 'success') {
            // Build Firebase credential with the Google access idToken.
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential)
                .catch((error) => {
                    // Handle Errors here.
                    console.log(error, 'error');
                });
        }
    }

    sendReq() {
        axios.get('http://43c7591f.ngrok.io/user')
            .then(res => console.log(res.data, 'res'))
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <View>
                {this.props.user ? <AuthStack /> : <LoginStack />}
                <Button
                    onPress={() => firebase.auth().signOut()}
                    title="Log Out"
                />
            </View>
            // <View>
            //     <Text>routerl</Text>
            //     <Button
            //         onPress={() => this.loginWithGoogle()}
            //         title="Log In"
            //     />
            //     <Button
            //         onPress={() => this.sendReq()}
            //         title="Test api"
            //     />
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#333333',
    },
  });

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loggedIn,
    loggedOut,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router)