import React from 'react';
import { Font, AppLoading } from "expo";
import { Provider } from 'react-redux';
import firebaseConfig from './firebase'
import store from './src/store';
import * as firebase from 'firebase';

// Initialize Firebase
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