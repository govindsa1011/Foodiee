import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, { Marker } from 'react-native-maps'
import { StackActions, NavigationActions } from 'react-navigation';

export default class Profile extends Component {
    state = {
        imgUri: undefined,
        userDetails: null
    }

    cameraClick = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log("Source:- " + source)
                this.setState({
                    imgUri: source.uri,
                });
            }
        });
    }

    constructor() {
        super()
        this.userdata().then((res) => {
            this.setState({
                userDetails: JSON.parse(res)
            })
        })
    }

    userdata = async () => {
        const value = await AsyncStorage.getItem('@store_user_detail')
        return value
    }

    btnLogOutClick = () => {
        Alert.alert(
            '',
            'Are you sure want to logout?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: () => {
                        AsyncStorage.clear();
                        const navigateAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: "Login" })],
                        });
                        this.props.navigation.dispatch(navigateAction);
                    }
                },
            ],
            { cancelable: false },
        );
    }

    render() {
        return (
            <ScrollView style={{ width: '100%', height: '100%', flex: 1, backgroundColor: '#000000' }} contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={true} keyboardShouldPersistTaps="always">
                <View style={{ flex: 1 }}>
                    <Image style={{ width: '100%', height: 300 }}
                        source={this.state.imgUri !== undefined ? { uri: this.state.imgUri } : require('../images/placeholder.png')}
                        resizeMode='cover' />
                    <View style={{ height: this.state.viewHeight }} />
                    <View style={[styles.cardViewStyle, { alignItems: 'center' }]} onLayout={(event) => {
                        this.setState({
                            viewHeight: (event.nativeEvent.layout.height - 40)
                        })
                    }}>
                        {
                            this.state.userDetails != null ? <View style={{ width: '100%', padding: 20 }}>
                                <Text style={{ color: 'black', fontFamily: 'Poppins-Bold', fontSize: 20, includeFontPadding: false }}>
                                    {this.state.userDetails.firstName + ' ' + this.state.userDetails.lastName}
                                </Text>
                                <Text style={{ color: 'grey', fontFamily: 'Poppins-Medium', fontSize: 16, includeFontPadding: false }}>
                                    {this.state.userDetails.email}
                                </Text>
                                <Text style={{ color: 'black', marginTop: 16, fontFamily: 'Poppins-Bold', fontSize: 16, includeFontPadding: false }}>Description</Text>
                                <Text style={{ color: 'grey', fontFamily: 'Poppins-Regular', fontSize: 14, includeFontPadding: false }}>
                                    In order to cook well or become a great chef, an incredible amount of practice, time, trial and error is required. Similarly, a great recipe is not developed overnight, but through a lot of incarnations until it reaches perfection. Recipe developers create great recipes by knowing how different ingredients react with one another, how they taste on their own, and what combinations just won't work.
                                </Text>
                                <Text style={{ color: 'black', marginTop: 16, fontFamily: 'Poppins-Bold', fontSize: 16, includeFontPadding: false }}>You are here:</Text>
                                <MapView
                                    ref={MapView => (this.MapView = MapView)}
                                    initialRegion={{
                                        latitude: 23.025719,
                                        longitude: 72.503360,
                                        latitudeDelta: 0.005,
                                        longitudeDelta: 0.005
                                    }}
                                    style={{ flex: 1, marginTop: 5, height: 200 }}
                                    loadingEnabled={true}
                                    scrollEnabled={false}
                                    loadingIndicatorColor="#666666"
                                    loadingBackgroundColor="#eeeeee"
                                    moveOnMarkerPress={true}
                                    showsUserLocation={true}
                                    showsCompass={true}
                                    showsPointsOfInterest={false}
                                    provider="google"
                                    showsUserLocation={true}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: 23.025719,
                                            longitude: 72.503360
                                        }}
                                        tracksViewChanges={false}
                                        title={this.state.userDetails.firstName + ' ' + this.state.userDetails.lastName}
                                        anchor={{ x: 0.5, y: 0.8 }}
                                        description={this.state.userDetails.email}
                                        identifier='1'
                                    >
                                        <View>
                                            <Image style={{ width: 40, height: 40 }} source={require('../images/marker.png')} />
                                        </View>
                                    </Marker>
                                </MapView>

                                <TouchableOpacity style={styles.logOutButtonStyle} onPress={() => this.btnLogOutClick()}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Poppins-Bold' }}>Log Out</Text>
                                </TouchableOpacity>
                            </View> : <View style={{ width: '100%', padding: 20, height: 290 }}></View>
                        }
                    </View>
                    <View style={styles.cameraIconStyle}>
                        <Image style={{ height: 95, width: 95, borderRadius: 95 }}
                            source={this.state.imgUri !== undefined ? { uri: this.state.imgUri } : require('../images/placeholder.png')} />
                    </View>
                    <View style={[styles.cameraIconStyle, { height: 35, width: 35, marginTop: 270, right: 25 }]}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.cameraClick()}>
                            <Icon size={14} color="black" name='camera' style={{ textAlignVertical: 'center' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
    cardViewStyle: {
        width: '100%',
        position: 'absolute',
        marginTop: 260,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 12,
    },
    logOutButtonStyle: {
        width: '100%',
        height: 40,
        marginTop: 60,
        marginBottom: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        borderRadius: 20,
        elevation: 3,
        color: 'white',
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    cameraIconStyle: {
        position: 'absolute',
        width: 100,
        height: 100,
        alignSelf: 'flex-end',
        marginTop: 210,
        right: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 15,
        backgroundColor: 'white'
    }
})
