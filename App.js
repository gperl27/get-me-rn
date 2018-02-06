import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import store from './src/store';

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

import Router from './src/Router';
class App extends React.Component {


  // _handlePress = () => {
  //   console.log(this.props.navigation, 'nav')
  //   this.props.navigation.navigate('Home');
  // }

  // renderContent() {
  //   switch (this.props.user) {
  //     case typeof user == 'object':
  //       return (
  //         <View>
  //           <Button title="Go home" onPress={this._handlePress} />
  //           <Button
  //             onPress={() => firebase.auth().signOut()}
  //             title="Log Out"
  //           />
  //         </View>
  //       );
  //     case false:
  //       return (
  //         <Button
  //           onPress={() => this.loginWithGoogle()}
  //           title="Log In"
  //         />
  //       );
  //     default:
  //       return <Text>Loading...</Text>;
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Router />
        </View>
      </Provider>
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

export default App