import React from 'react';
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { StyleSheet, Platform, StatusBar } from 'react-native'

const CreateTaskScreen = ({ navigation }) => {
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
                <Text>tasj</Text>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    appHeaderFix: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
});

export default CreateTaskScreen;   