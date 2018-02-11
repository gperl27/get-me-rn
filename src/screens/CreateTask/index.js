import React from 'react';
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title, Text, Form, Item, Input } from 'native-base';
import { StyleSheet, Platform, StatusBar } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import { submitCreateTask } from '../../modules/tasks'

const CustomInput = ({ input, placeholder, keyboardType }) => {
    return (
        <Item>
            <Input 
                {...input} 
                placeholder={placeholder}
                keyboardType={keyboardType || 'default'}
            />
        </Item>
    )
}

class CreateTaskScreen extends React.Component {
    onSubmit = values => {
        this.props.submitCreateTask(values);
    }

    render() {
        const { navigation } = this.props;
        // console.log(this.props);
        return (
            <Container style={styles.appHeaderFix}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Field
                            name='title'
                            component={CustomInput}
                            placeholder='Title'
                        />
                        <Field
                            name='instructions'
                            component={CustomInput}
                            placeholder='Instructions'
                        />
                        <Field
                            name='offer'
                            component={CustomInput}
                            placeholder='Offer'
                            keyboardType='numeric'
                        />
                        <Button
                            transparent
                            onPress={this.props.handleSubmit(this.onSubmit)}
                        >
                            <Text>Submit</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    appHeaderFix: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
});

const mapDispatchToProps = dispatch => bindActionCreators({
    submitCreateTask,
}, dispatch)

export default compose(
    connect(null, mapDispatchToProps),
    reduxForm({ form: 'create-task' }),
)(CreateTaskScreen)