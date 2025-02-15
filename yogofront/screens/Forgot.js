import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';

const VALID_EMAIL = "yogoyogo@naver.com";

export default class Forgot extends Component {
    state = {
        email: VALID_EMAIL,
        errors: [],
        loading: false,
    }

    handleForgot() {
        const { navigation } = this.props;
        const { email } = this.state;
        const errors = [];

        Keyboard.dismiss();

        this.setState({ errors: [], loading: true });

        if (email !== VALID_EMAIL) {
            errors.push('email');
        }
    

        this.setState({ errors, loading: false });

        if (!errors.length) {
            Alert.alert(
                'Password sent your email.',
                'Please check you email.',
            [
                {
                    text: 'OK', onPress:() => {
                        navigation.navigate('Login')
                    }
                }
            ],
            {cancelable: false}
            )
        } else {
            Alert.alert(
                'Error',
                'Please check you email address.',
                [
                    {
                       text: 'Try again', 
                    }
                ],
                { cancelable: false }
            )

        }
    }


    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
        return (
            <KeyboardAvoidingView style={styles.forgot} behavior="height">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>Forgot</Text>
                    <Block middle>
                        <Input
                            label="Email"
                            error={hasErrors('email')}
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
 
                        <Button gradient onPress={() => this.handleForgot()}>
                            {loading ? <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Forgot</Text>
                            }
                        </Button>
                        <Text center onPress={() => navigation.goBack()}>
                            <Text gray caption center style={{ textDecorationLine: 'underline' }}>Back to Login</Text>
                        </Text>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    forgot: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent,
    }

})