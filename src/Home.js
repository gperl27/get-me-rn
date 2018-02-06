import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    Text,
    View,
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

import {
    loggedIn,
    loggedOut,
  } from './modules/auth';

class HomeScreen extends React.Component {
    render() {
        console.log(this.props, 'home screen props')
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text>HomeScreen!</Text>
            </View>
        )
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
)(HomeScreen)