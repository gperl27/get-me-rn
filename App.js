import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as firebase from 'firebase';

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

// async function loginWithGoogle() {
//   const { type, token } = await Expo.Google.logInAsync({
//     androidClientId: '552161870836-veobnags5gb12orlht04s84s5hvn9put.apps.googleusercontent.com',
//     iosClientId: '552161870836-5ua971a4hmtjhj49qahk7lc44qfg5rid.apps.googleusercontent.com',
//     scopes: ['profile', 'email'],
//   });

//   console.log(type, token, 'REZ')

//   if (type === 'success') {
//     // Build Firebase credential with the Google access token.
//     const credential = firebase.auth.GoogleAuthProvider.credential(token);

//     // Sign in with credential from the Google user.
//     firebase.auth().signInWithCredential(credential).catch((error) => {
//       // Handle Errors here.
//       console.log(error, 'error');
//     });
//   }
// }

import Location from './src/Location';
export default class App extends React.Component {
  state = { loggedIn: null };

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

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button
            onPress={() => firebase.auth().signOut()
            }
            title="Log Out"
          />
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
