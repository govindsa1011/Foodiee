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
    TouchableOpacity,
    Keyboard
} from 'react-native';
import ShakingText from 'react-native-shaking-text';

class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        isLoading: false,
        strFullName: "", isNameValid: true, errMsgFullName: "",
        strEmail: "", isEmailValid: true, errMsgEmail: "",
        strPassword: "", isPasswordValid: true, errMsgPassword: "",
        strConfirmPassword: "", isConfirmPasswordValid: true, errMsgConfirmPassword: ""
    }

    btnClickHandler = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.strFullName === "") {
            this.setState({
                isNameValid: false
            })
            setTimeout(() => this.setState({
                errMsgFullName: ""
            }), 5)

            setTimeout(() => this.setState({
                errMsgFullName: "Please Enter Full Name"
            }), 50)
        } else {
            this.setState({
                isNameValid: true
            })
        }
        
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

        if (this.state.strConfirmPassword === "") {
            this.setState({
                isConfirmPasswordValid: false
            })
            setTimeout(() => this.setState({
                errMsgConfirmPassword: ""
            }), 5)
            setTimeout(() => this.setState({
                errMsgConfirmPassword: "Please Enter Password"
            }), 50)
        } else if (this.state.strPassword !== this.state.strConfirmPassword) {
            this.setState({
                isConfirmPasswordValid: false
            })
            setTimeout(() => this.setState({
                errMsgConfirmPassword: ""
            }), 5)
            setTimeout(() => this.setState({
                errMsgConfirmPassword: "Password does not match"
            }), 50)
        } else {
            this.setState({
                isConfirmPasswordValid: true
            })
        }

        setTimeout(() => {
            if (this.state.isNameValid && this.state.isEmailValid && this.state.isPasswordValid && this.state.isConfirmPasswordValid) {
                this.setState({
                    isLoading: true
                })
                setTimeout(() => {
                    this.setState({
                        isLoading: false
                    })
                }, 1000)
            }
        }, 100)
    }

    txtFullNameChangeHangler = (val) => {
        this.setState({
            strFullName: val.trim()
        })
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

    txtConfirmPasswordChangeHangler = (val) => {
        this.setState({
            strConfirmPassword: val.trim()
        })
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
                                        placeholder='Full Name'
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        returnKeyType='next'
                                        autoCorrect={false}
                                        value={this.state.strFullName}
                                        onChangeText={this.txtFullNameChangeHangler}
                                        onSubmitEditing={() => this.refs.txtEmail.focus()} />

                                    {!this.state.isNameValid ? <ShakingText style={{ color: '#f7c744', marginBottom: 10 }}>{this.state.errMsgFullName}</ShakingText> : <View style={{ marginBottom: 20 }} />}

                                    <TextInput style={styles.input}
                                        placeholder='Email Id'
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        keyboardType='email-address'
                                        returnKeyType='next'
                                        autoCorrect={false}
                                        value={this.state.strEmail}
                                        onChangeText={this.txtEmailChangeHangler}
                                        onSubmitEditing={() => this.refs.txtPassword.focus()} 
                                        ref={"txtEmail"}/>

                                    {!this.state.isEmailValid ? <ShakingText style={{ color: '#f7c744', marginBottom: 10 }}>{this.state.errMsgEmail}</ShakingText> : <View style={{ marginBottom: 20 }} />}

                                    <TextInput style={styles.input}
                                        placeholder='Password'
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        returnKeyType='next'
                                        secureTextEntry
                                        value={this.state.strPassword}
                                        onChangeText={this.txtPasswordChangeHangler}
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.refs.txtConfirmPassword.focus()} 
                                        ref={"txtPassword"} />

                                    {!this.state.isPasswordValid ? <ShakingText style={{ color: '#f7c744', marginBottom: 10 }}>{this.state.errMsgPassword}</ShakingText> : <View style={{ marginBottom: 20 }} />}

                                    <TextInput style={styles.input}
                                        placeholder='Confirm Password'
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        returnKeyType='go'
                                        secureTextEntry
                                        value={this.state.strConfirmPassword}
                                        onChangeText={this.txtConfirmPasswordChangeHangler}
                                        autoCorrect={false}
                                        ref={"txtConfirmPassword"} />

                                    {!this.state.isConfirmPasswordValid ? <ShakingText style={{ color: '#f7c744', marginBottom: 10 }}>{this.state.errMsgConfirmPassword}</ShakingText> : <View style={{ marginBottom: 20 }} />}

                                    {this.state.isLoading ?
                                        <ActivityIndicator size="large" color="#f7c744" />
                                        : <TouchableOpacity style={styles.buttonContainer} onPress={this.btnClickHandler}>
                                            <Text style={styles.buttonText}>Sign Up</Text>
                                        </TouchableOpacity>}

                                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                        <Text style={styles.txtSignUpStyle}>Sign In</Text>
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
        marginTop: '30%'
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
        height: "60%",
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

export default RegisterScreen