import React from 'react';

import {
    Text,
    View,
} from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ backgroundColor: '#333333', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text>HomeScreen!</Text>
            </View>
        )
    }
}

