import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './src/screens/splash'
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/signup';
import DashBoardScreen from './src/screens/dashboard';
import DetailScreen from './src/screens/detail';
import MapComponent from './src/screens/map';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const AppContainer = createAppContainer(
    createStackNavigator({
        Splash: { screen: SplashScreen },
        Login: { screen: LoginScreen },
        Register: { screen: RegisterScreen },
        DashBoard: { screen: DashBoardScreen },
        Detail: { screen: DetailScreen },
        MapScreen:{screen:MapComponent}
    })
)

const initialState = {
    token: ''
}

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOKEN_UPDATE':
            return { 
                ...state,
                token: action.payload
            }

        default: return { ...state,token: state.token}
    }
}

const store = createStore(myReducer)

export default function App() {
    return <Provider store={store}>
        <AppContainer />
    </Provider>
};
