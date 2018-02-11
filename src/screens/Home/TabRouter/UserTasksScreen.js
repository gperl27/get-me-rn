import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    Button,
    Text,
    Container,
    Card,
    CardItem,
    Body,
    Content,
    Header,
    Title,
    Left,
    Icon,
    Right,
    Footer,
    FooterTab,
    List,
    ListItem,
    Thumbnail,
} from "native-base";
import { View } from 'react-native'

import { fetchUserTasks } from '../../../modules/tasks';

class UserTasksScreen extends React.Component {
    componentDidMount() {
        const { tasks, fetchUserTasks } = this.props;
        !tasks ? fetchUserTasks() : null;
    }

    render() {
        const { tasks, isLoading } = this.props;
        return (
            isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>fetching!</Text>
                </View>
                :
                tasks.length > 0 ?
                    <List dataArray={this.props.tasks}
                        renderRow={(task) =>
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail source={{ uri: 'Image URL' }} />
                                </Left>
                                <Body>
                                    <Text>{task.title}</Text>
                                    <Text note>Jan 17, 2017</Text>
                                    <Text note>Johan successfully got this for you.</Text>
                                </Body>
                                <Right>
                                    <Text note>$13.45</Text>
                                </Right>
                            </ListItem>
                        }>
                    </List>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>no tasks yet!!</Text>
                    </View>
        );
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks.userTasks,
    isLoading: state.tasks.fetchingUserTasks,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUserTasks,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserTasksScreen);