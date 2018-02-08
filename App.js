import React from 'react';
import { Font, AppLoading } from "expo";
import { Provider } from 'react-redux';
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

import HomeScreenRouter from './src/screens/Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

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
      this.state.loading ?
        <AppLoading />
        :
        <Provider store={store}>
          <HomeScreenRouter />
        </Provider>
    );
  }
}


export default App