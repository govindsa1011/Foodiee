import React from 'react';
import {
    StyleSheet, Image,
    SafeAreaView,
    ImageBackground,
    ActivityIndicator,
    StatusBar,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    View,
    TextInput,
    Text,
    Keyboard,
    TouchableOpacity,
    Alert
} from 'react-native';
import ShakingText from 'react-native-shaking-text';
import { StackActions, NavigationActions } from 'react-navigation';

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        isLoading: false,
        strEmail: "jm1@example.com", isEmailValid: true, errMsgEmail: "",
        strPassword: "jay@123", isPasswordValid: true, errMsgPassword: "",
        strErrMsg: ""
    }

    btnClickHandler = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.strEmail === "") {
            this.setState({
                isEmailValid: false
            })
            setTimeout(() => this.setState({
                errMsgEmail: ""
            }), 5)

            setTimeout(() => this.setState({
                errMsgEmail: "Please Enter Email Id"
            }), 50)
        } else if (reg.test(this.state.strEmail) === false) {
            this.setState({
                isEmailValid: false
            })
            setTimeout(() => this.setState({
                errMsgEmail: ""
            }), 5)

            setTimeout(() => this.setState({
                errMsgEmail: "Please Enter Valid Email Id"
            }), 50)
        } else {
            this.setState({
                isEmailValid: true
            })
        }

        if (this.state.strPassword === "") {
            this.setState({
                isPasswordValid: false
            })
            setTimeout(() => this.setState({
                errMsgPassword: ""
            }), 5)
            setTimeout(() => this.setState({
                errMsgPassword: "Please Enter Password"
            }), 50)
        } else if (this.state.strPassword.length < 6) {
            this.setState({
                isPasswordValid: false
            })
            setTimeout(() => this.setState({
                errMsgPassword: ""
            }), 5)
            setTimeout(() => this.setState({
                errMsgPassword: "Password length must be greater than 6 character."
            }), 50)
        } else {
            this.setState({
                isPasswordValid: true
            })
        }

        setTimeout(() => {
            if (this.state.isEmailValid && this.state.isPasswordValid) {
                this.setState({
                    isLoading: true
                })

                fetch("http://35.160.197.175:3006/api/v1/user/login", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': this.state.strEmail,
                        'password': this.state.strPassword
                    })
                }).then((response) => {
                    if (response.status == 200) {
                        return response.json()
                    } else {
                        return null
                    }
                }).then((responseJson) => {
                    console.log(responseJson);
                    this.setState({
                        isLoading: false
                    })

                    if (responseJson != null) {
                        this.setState({
                            strErrMsg: ""
                        })

                        // Alert.alert('Success', 'Logged In', [
                        //     {
                        //         text: 'Cancel',
                        //         style: 'default'
                        //     },
                        //     {
                        //         text: 'Okay',
                        //         style: 'default',
                        //         onPress: () => {
                        //             const navigateAction = StackActions.reset({
                        //                 index: 0,
                        //                 actions: [NavigationActions.navigate({ routeName: "DashBoard" })],
                        //             });
                        //             this.props.navigation.dispatch(navigateAction);
                        //         }
                        //     }
                        // ])

                        const navigateAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: "DashBoard" })],
                        });
                        this.props.navigation.dispatch(navigateAction);

                    } else {
                        this.setState({
                            strErrMsg: "Email and password does not match."
                        })
                    }
                })
            }
        }, 100)
    }

    txtEmailChangeHangler = (val) => {
        this.setState({
            strEmail: val.trim()
        })
    }

    txtPasswordChangeHangler = (val) => {
        this.setState({
            strPassword: val.trim()
        })
    }

    onSignUpClick = () => {
        this.props.navigation.navigate("Register")
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor='black' />
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <ImageBackground style={{ flex: 1 }} resizeMode='cover' source={require('../images/splash.jpg')}>
                        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                            <View style={styles.transparentBg}>
                                <View style={styles.logoContainer}>
                                    <Image style={styles.logo} source={require('../images/logo.png')} />
                                    <Text style={styles.title}>FoodApp</Text>
                                </View>
                                <View style={styles.infoContainer}>
                                    <TextInput style={styles.input}
                                        placeholder='Email Id'
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        keyboardType='email-address'
                                        returnKeyType='next'
                                        autoCorrect={false}
                                        value={this.state.strEmail}
                                        onChangeText={this.txtEmailChangeHangler}
                                        onSubmitEditing={() => this.refs.txtPassword.focus()} />

                                    {!this.state.isEmailValid ? <ShakingText style={{ color: '#f7c744', marginBottom: 10 }}>{this.state.errMsgEmail}</ShakingText> : <View style={{ marginBottom: 20 }} />}

                                    <TextInput style={styles.input}
                                        placeholder='Password'
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        returnKeyType='go'
                                        secureTextEntry
                                        value={this.state.strPassword}
                                        onChangeText={this.txtPasswordChangeHangler}
                                        autoCorrect={false}
                                        ref={"txtPassword"} />

                                    {!this.state.isPasswordValid ? <ShakingText style={{ color: '#f7c744', marginBottom: 10 }}>{this.state.errMsgPassword}</ShakingText> : <View style={{ marginBottom: 20 }} />}

                                    {this.state.isLoading ?
                                        <ActivityIndicator size="large" color="#f7c744" />
                                        : <TouchableOpacity style={styles.buttonContainer} onPress={this.btnClickHandler}>
                                            <Text style={styles.buttonText}>Sign In</Text>
                                        </TouchableOpacity>}

                                    <TouchableOpacity onPress={this.onSignUpClick}>
                                        <Text style={styles.txtSignUpStyle}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        flexDirection: 'column'
    },
    errContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    logoContainer: {
        alignItems: 'center',
        flex: 1,
        marginTop: '40%'
    },
    transparentBg: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1
    },
    logo: {
        width: 100,
        height: 100,
        tintColor: 'rgb(255,255,255)'
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        marginTop: 5,
        fontWeight: 'bold'
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: "50%",
        padding: 24
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgb(32,53,70)',
        fontWeight: 'bold',
        fontSize: 16
    },
    txtSignUpStyle: {
        color: '#f7c744',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    }
});

export default LoginScreen