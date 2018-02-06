import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as firebase from 'firebase';

import {
  StackNavigator,
} from 'react-navigation';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCQTcJeU4PeuRapg_6drcPS9NE9CbPEBzE",
  authDomain: "behest-a2d93.firebaseapp.com",
  databaseURL: "https://behest-a2d93.firebaseio.com",
  projectId: "behest-a2d93",
  storageBucket: "behest-a2d93.appspot.com",
  messagingSenderId: "665105818131"
};

firebase.initializeApp(firebaseConfig);

class Auth extends React.Component {
  state = { loggedIn: null };

  static navigationOptions = {
    title: 'Login'
  };

  componentDidMount() {
    // axios.get(
    //   'http://af208768.ngrok.io')
    //   .then(res => console.log(res.data, 'res'))
    //   .catch(err => {
    //     console.log(err);
    //   })

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user, 'user')
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
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

  _handlePress = () => {
    console.log(this.props.navigation, 'nav')
    this.props.navigation.navigate('Home');
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View>
            <Button title="Go home" onPress={this._handlePress} />
            <Button
              onPress={() => firebase.auth().signOut()}
              title="Log Out"
            />
          </View>
        );
      case false:
        return (
          <Button
            onPress={() => this.loginWithGoogle()}
            title="Log In"
          />
        );
      default:
        return <Text>Loading...</Text>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Mah app</Text>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StackNavigator({
  Login: {
    screen: App,
  },
});