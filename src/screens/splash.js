import React from 'react';
import * as appJson from '../../app.json';
import { StyleSheet, StatusBar, ImageBackground, Image, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SplashScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        this.getData()
    }

    getData = async () => {
        try {
            let route = 'Login'
            const value = await AsyncStorage.getItem('@store_token')
            console.log("Value:- "+value)
            if (value !== null) {
                route = 'DashBoard'
                this.props.updateT(value)
            }

            const navigateAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: route })],
            });

            setTimeout(() => {
                this.props.navigation.dispatch(navigateAction);
            }, 3000)
        } catch (e) {
            // error reading value
            console.log(e)
        }
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

const updateToken = (token) => {
    return {
        type: 'TOKEN_UPDATE',
        payload: token
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateT: (token) => updateToken(token)
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)