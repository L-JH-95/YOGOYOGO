import React, {Component} from 'react';
import {View} from 'react-native';
import {GoogleSigninButton, GoogleSignin, statusCodes} from '@react-native-community/google-signin';

class LoginPage extends Component {
    componentDidMount() {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId:'197379581458-nvmhk4a6mo3pq8e9ak3rcnve8iu0l42h.apps.googleusercontent.com',
            offlineAccess: true,
            forceConsentPrompt: true,
            //iosClicetId: '<FROM DEVELOPER CONSOLE>',
        });
    }
    _signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log(userInfo);
    
          this.setState({
            userInfo: userInfo,
            loggedIn: true,
          });
    
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('cancle');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('progress');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('not available');
          } else {
    
          }
          console.log(error);
        }
      };

    render() {
        return (
            <View>
            <GoogleSigninButton
            size = {GoogleSigninButton.Size.Wide}
            color = {GoogleSigninButton.Color.Dark}
            onPress ={this._signIn} />
        </View>
        )
    }
};

export default LoginPage;