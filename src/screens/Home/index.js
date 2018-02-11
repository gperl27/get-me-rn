import React, { Component } from "react";
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { DrawerNavigator } from "react-navigation";

import HomeScreen from "./HomeScreen";
import Sidebar from "./Sidebar";
import LoginScreen from "../Login/LoginScreen";

import {
  loggedIn,
  loggedOut,
} from '../../modules/auth'

import { Text, View } from 'react-native'

import CreateTaskScreen from '../CreateTask';

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    CreateTask: {
      screen: CreateTaskScreen,
      navigationOptions: {
        drawerLockMode: 'locked-closed'
      },
    }
  },
  {
    contentComponent: props => <Sidebar {...props} />
  },
);

class AuthedRouter extends Component {
  componentDidMount() {
    const { loggedIn, loggedOut } = this.props;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken(true).then(function (idToken) {
          axios.defaults.headers.common['Authorization'] = idToken;
          axios.get(
            'http://d2c234c5.ngrok.io/auth_user', { params: { user } })
            .then(res => loggedIn(res.data))
            .catch(err => {
              firebase.auth().signOut()
            })
        });

      } else {
        delete axios.defaults.headers.common['Authorization'];
        loggedOut();
      }
    });
  }

  delegateAuthedComponent() {
    if (this.props.user) {
      return <HomeScreenRouter />
    }

    return <LoginScreen />
  }

  render() {
    return (this.delegateAuthedComponent())
  }
}

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
)(AuthedRouter)