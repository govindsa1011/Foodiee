import React from 'react';
import * as appJson from '../../app.json';
import { StyleSheet, StatusBar, ImageBackground, Image, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

class SplashScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Login" })],
        });

        setTimeout(() => {
            this.props.navigation.dispatch(navigateAction);
        }, 3000)
    }

    render() {
        return (
            <ImageBackground style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} resizeMode='cover' source={require('../../src/images/splash.jpg')}>
                <StatusBar backgroundColor='black' barStyle='light-content' />
                <Image style={{ width: 100, height: 100, tintColor: 'white' }} source={require('../../src/images/logo.png')} resizeMode='contain' />
                <Text style={styles.textStyle}>{appJson.name}</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold'
    },
});

export default SplashScreen