import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from './src/screens/splash'
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/signup';
import DashBoardScreen from './src/screens/dashboard';
import DetailScreen from './src/screens/detail';

const MainNavigator = createStackNavigator({
    Splash: {screen: SplashScreen},
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
    DashBoard: {screen: DashBoardScreen},
    Detail:{screen:DetailScreen}
});

const App = createAppContainer(MainNavigator);

export default App;
