import React from 'react';
import axios from 'axios';
import { Container, Content, Button, Text } from 'native-base'

import * as firebase from 'firebase';

import {
  StackNavigator,
} from 'react-navigation';

class LoginScreen extends React.Component {
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

  render() {
    return (
      <Container>
        <Content>
          <Button onPress={() => this.loginWithGoogle()}>
            <Text>Log In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default LoginScreen;