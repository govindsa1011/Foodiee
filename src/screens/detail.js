import React from 'react'
import { View, Image, Text, ActivityIndicator, TouchableOpacity, ImageBackground, StyleSheet, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { RNChipView } from 'react-native-chip-view';
import ImagePicker from 'react-native-image-picker';
import * as Constant from '../utils/constants';
import ProgressLoader from 'rn-progress-loader';
import { connect } from 'react-redux';

class DetailScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        isImgLoading: true,
        imgUri: undefined,
        isUploading: false
    }

    cameraClick = (recipeId) => {
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

                this.uploadImage(recipeId)
            }
        });
    }

    uploadImage = (recipeId) => {
        this.setState({
            isUploading: true
        })

        fetch(Constant.BASE_URL + Constant.UPLOAD_RECIPE_PHOTO, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + this.props.token
            },
            body: this.createFormData(recipeId)
        }).then((response) => {
            if (response.status == 200) {
                console.log(response);
                return response.json()
            } else {
                return null
            }
        }).then((responseJson) => {
            console.log(responseJson);
            this.setState({
                isUploading: false
            })
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                imgUri: this.props.navigation.state['params']['data'].imgUri
            })
        }, 100)
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
        let data = this.props.navigation.state['params']['data'];

        var chipsTags = ["Gujarati", "Rajasthani", "Punjabi", "South Indian", "Breakfast", "Crunchy", "Fast Food"];
        var chipsView = [];
        for (let i = 0; i < 7; i++) {
            chipsView.push(
                <View style={{ marginTop: 10, marginRight: 10 }}>
                    <RNChipView
                        titleStyle={{ fontSize: 12 }}
                        height={30}
                        title={chipsTags[i]}
                        avatar={false}
                    />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(165,165,165,0.2)' }}>
                <ProgressLoader
                    visible={this.state.isUploading}
                    isModal={true} isHUD={true}
                    hudColor={"#000000"}
                    color={"#FFFFFF"} />
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <ImageBackground style={{ width: '100%', height: 300 }}
                    onLoad={() => {
                        this.setState({
                            isImgLoading: false
                        })
                    }}
                    source={this.state.imgUri != undefined ? { uri: this.state.imgUri } : (data.photo != null ? { uri: data.photo } : require('../images/placeholder.png'))}
                    resizeMode='cover'>
                    <TouchableOpacity style={styles.circleShadow} onPress={() => this.props.navigation.pop()}>
                        <Icon size={16} color="white" name='chevron-left' />
                    </TouchableOpacity>

                    {this.state.isImgLoading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="small" color="#000000" />
                    </View> : <View></View>}

                </ImageBackground>
                <View style={styles.cardViewStyle}>
                    <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold' }}>{data.name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Icon size={16} color="grey" name='user' style={{ textAlignVertical: 'center' }} />
                        <Text style={{ textAlignVertical: 'center', fontFamily: 'Poppins-Regular', includeFontPadding: false, paddingStart: 5, color: 'grey' }}>{data.firstName + " " + data.lastName}</Text>
                    </View>
                    <Text style={{ marginTop: 24, fontSize: 20, fontFamily: 'Poppins-Bold' }}>Tags:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                        {chipsView}
                    </View>
                    <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={[styles.smallCardStyle, { marginRight: 20 }]}>
                            <Icon size={24} color="black" name='clock-o' style={{ textAlignVertical: 'center' }} />
                            <Text style={{ fontSize: 12, marginTop: 8, fontFamily: 'Poppins-Medium' }}>{data.preparationTime}</Text>
                        </View>
                        <View style={[styles.smallCardStyle, { marginRight: 20 }]}>
                            <Icon size={24} color="black" name='cogs' style={{ textAlignVertical: 'center' }} />
                            <Text style={{ fontSize: 12, marginTop: 8, fontFamily: 'Poppins-Medium' }}>{data.complexity}</Text>
                        </View>
                        <View style={styles.smallCardStyle}>
                            <Icon size={24} color="black" name='group' style={{ textAlignVertical: 'center' }} />
                            <Text style={{ fontSize: 12, marginTop: 8, fontFamily: 'Poppins-Medium' }}>{data.serves}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cameraIconStyle}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.cameraClick(data.recipeId)}>
                        <Icon size={20} color="black" name='camera' style={{ textAlignVertical: 'center' }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    circleShadow: {
        width: 40,
        height: 40,
        paddingEnd: 3,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 20,
        marginStart: 16
    },
    cardViewStyle: {
        padding: 20,
        position: 'absolute',
        width: '100%',
        height: '100%',
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
        marginTop: 260,
        elevation: 20,
    },
    smallCardStyle: {
        flex: 1,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
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

        elevation: 21,
        backgroundColor: 'white'
    }
})

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(DetailScreen)