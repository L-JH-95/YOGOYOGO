import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LoginPage from './src/screen/login';

export default class App extends Component {

  render() {
    return (
      <View>
      <LoginPage />
      </View>
    )
  }
}

