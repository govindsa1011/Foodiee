import React from 'react'
import { View, StyleSheet, ScrollView, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Constant from '../utils/constants'
import ImagePicker from 'react-native-image-picker';

export default class AddNewRecipe extends React.Component {
    state = {
        strName: "", isNameValid: true,
        strPreprationTime: "", isTimeValid: true,
        strNumOfServes: "", isNumValid: true,
        isLoading: false,
        imgUri: undefined,
        strSelectedTime: 'minutes', strComplexity: 'Easy',
        viewHeight: 369
    }

    txtNameChangeHangler = (val) => {
        this.setState({
            strName: val
        })
    }

    txtTimeChangeHangler = (val) => {
        this.setState({
            strPreprationTime: val
        })
    }

    txtNoServerChangeHangler = (val) => {
        this.setState({
            strNumOfServes: val
        })
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

    btnSubmitClick = () => {

        if (this.state.strName.trim() === "") {
            this.setState({
                isNameValid: false
            })
        } else {
            this.setState({
                isNameValid: true
            })
        }

        if (this.state.strPreprationTime.trim() === "") {
            this.setState({
                isTimeValid: false
            })
        } else {
            this.setState({
                isTimeValid: true
            })
        }

        if (this.state.strNumOfServes.trim() === "") {
            this.setState({
                isNumValid: false
            })
        } else {
            this.setState({
                isNumValid: true
            })
        }

        setTimeout(() => {
            if (this.state.isNameValid && this.state.isTimeValid && this.state.isNumValid) {

                this.setState({
                    isLoading: true
                })

                fetch(Constant.BASE_URL + Constant.ADD_RECIPE, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': "Bearer " + this.props.token
                    },
                    body: JSON.stringify({
                        'name': this.state.strName,
                        'preparationTime': this.state.strPreprationTime + " " + this.refs.dropdownTime.selectedItem().value,
                        'serves': this.state.strNumOfServes,
                        'complexity': this.refs.dropdownComplexity.selectedItem().value
                    })
                }).then((response) => {
                    if (response.status == 200) {
                        return response.json()
                    } else {
                        return null
                    }
                }).then((responseJson) => {
                    console.log("Data Id:- " + responseJson.id);

                    if (this.state.imgUri!==undefined) {
                        this.uploadImage(responseJson.id)
                    } else {
                        this.setState({
                            strName: "", isNameValid: true,
                            strPreprationTime: "", isTimeValid: true,
                            strNumOfServes: "", isNumValid: true,
                            strSelectedTime: 'minutes', strComplexity: 'Easy',
                            isLoading: false
                        })
                    }
                })
            }
        }, 100)
    }

    uploadImage = (recipeId) => {
        fetch(Constant.BASE_URL + Constant.UPLOAD_RECIPE_PHOTO, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + this.props.token
            },
            body: this.createFormData(recipeId)
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                return null
            }
        }).then((responseJson) => {
            console.log(responseJson);
            this.setState({
                strName: "", isNameValid: true,
                strPreprationTime: "", isTimeValid: true,
                strNumOfServes: "", isNumValid: true,
                isLoading: false,
                strSelectedTime: 'minutes', strComplexity: 'Easy',
                imgUri: undefined
            })

            if (responseJson != null) {
                console.log("Success")
            } else {
                console.log("Something went wrong");
            }
        })
    }

    createFormData = (id) => {
        const data = new FormData();
        var photo = {
            uri: this.state.imgUri,
            type: 'image/png',
            name: 'photo.png',
        };
        data.append("photo", photo);
        data.append("recipeId", id)
        console.log("RecipeData " + data);
        console.log("ID:" + id + " URI : " + this.state.imgUri)
        return data;
    };

    render() {
        let preprationTimeArray = [{
            value: 'minutes',
        }, {
            value: 'hours',
        }, {
            value: 'day',
        }];

        let complexityArray = [{
            value: 'Easy',
        }, {
            value: 'Medium',
        }, {
            value: 'Complex',
        }];

        return (
            <ScrollView style={{ width: '100%', height: '100%', flex: 1, backgroundColor: '#000000' }} contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={true} keyboardShouldPersistTaps="always">
                <View style={{ flex: 1 }}>
                    <Image style={{ width: '100%', height: 300 }}
                        source={this.state.imgUri !== undefined ? { uri: this.state.imgUri } : require('../images/placeholder.gif')}
                        resizeMode='cover' />
                    <View style={{ height: this.state.viewHeight }} />
                    <View style={[styles.cardViewStyle, { alignItems: 'center' }]} onLayout={(event) => {
                        this.setState({
                            viewHeight: (event.nativeEvent.layout.height - 40)
                        })
                    }}>
                        <TextInput style={[styles.input, { marginTop: 50 }]}
                            placeholder='Name'
                            placeholderTextColor={this.state.isNameValid ? "#808080" : "#f7c744"}
                            keyboardType='default'
                            returnKeyType='next'
                            autoCorrect={false}
                            value={this.state.strName}
                            onChangeText={this.txtNameChangeHangler}
                            onSubmitEditing={() => this.refs.txtTime.focus()} />

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TextInput style={[styles.inputSmall, { marginRight: 10 }]}
                                placeholder='Prepration Time'
                                placeholderTextColor={this.state.isTimeValid ? "#808080" : "#f7c744"}
                                keyboardType='numeric'
                                returnKeyType='next'
                                autoCorrect={false}
                                value={this.state.strPreprationTime}
                                onChangeText={this.txtTimeChangeHangler}
                                onSubmitEditing={() => this.refs.dropdownTime.focus()}
                                ref={"txtTime"} />
                            <View style={[styles.dropDownStyle, { marginRight: 10 }]}>
                                <Dropdown
                                    animationDuration={100}
                                    ref={"dropdownTime"}
                                    containerStyle={{ marginTop: 10, marginStart: 10 }}
                                    dropdownOffset={{ top: 0, left: 0 }}
                                    rippleInsets={{ top: 0, bottom: 0 }}
                                    value={this.state.strSelectedTime}
                                    data={preprationTimeArray} />
                            </View>
                        </View>

                        <TextInput style={[styles.input, { marginTop: 0 }]}
                            placeholder='Number of Serves'
                            placeholderTextColor={this.state.isNumValid ? "#808080" : "#f7c744"}
                            keyboardType='numeric'
                            returnKeyType='next'
                            autoCorrect={false}
                            value={this.state.strNumOfServes}
                            onChangeText={this.txtNoServerChangeHangler}
                            onSubmitEditing={() => this.refs.dropdownComplexity.focus()} />

                        <View style={[styles.dropDownStyle, { width: '85%', marginTop: 10 }]}>
                            <Dropdown
                                label="Complexity"
                                ref={"dropdownComplexity"}
                                animationDuration={100}
                                containerStyle={{ marginTop: 10 }}
                                dropdownOffset={{ top: 0, left: 0 }}
                                rippleInsets={{ top: 0, bottom: 0 }}
                                value={this.state.strComplexity}
                                data={complexityArray} />
                        </View>

                        {this.state.isLoading ? <ActivityIndicator size="large" color="#000000" style={{ marginTop: 60,marginBottom:60 }} /> :
                            <TouchableOpacity style={styles.submitButtonStyle} onPress={() => this.btnSubmitClick()}>
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Submit</Text>
                            </TouchableOpacity>}
                    </View>
                    <View style={styles.cameraIconStyle}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.cameraClick()}>
                            <Icon size={20} color="black" name='camera' style={{ textAlignVertical: 'center' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
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
    input: {
        width: "90%",
        height: 40,
        margin: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: '#000000',
        paddingStart: 20,
        paddingHorizontal: 10
    },
    inputSmall: {
        width: "54%",
        height: 40,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: '#000000',
        paddingStart: 20,
        paddingHorizontal: 10
    },
    dropDownStyle: {
        width: "30%",
        height: 40,
        justifyContent: 'center',
        color: '#000000'
    },
    submitButtonStyle: {
        width: 350,
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
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
        marginTop: 230,
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