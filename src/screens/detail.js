import React from 'react'
import { View, Image, Text, ActivityIndicator, TouchableOpacity, ImageBackground, StyleSheet, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { RNChipView } from 'react-native-chip-view';

export default class DetailScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        isImgLoading: true
    }

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
                    source={data.photo != null ? { uri: data.photo } : require('../images/placeholder.gif')}
                    resizeMode='cover'>
                    <TouchableOpacity style={styles.circleShadow} onPress={() => this.props.navigation.pop()}>
                        <Icon size={16} color="white" name='chevron-left' />
                    </TouchableOpacity>

                    {this.state.isImgLoading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="small" color="#000000" />
                    </View> : <View></View>}

                </ImageBackground>
                <View style={styles.cardViewStyle}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Icon size={16} color="grey" name='user' style={{ textAlignVertical: 'center' }} />
                        <Text style={{ textAlignVertical: 'center', paddingStart: 5, color: 'grey' }}>{data.firstName + " " + data.lastName}</Text>
                    </View>
                    <Text style={{ marginTop: 24, fontSize: 20, fontWeight: 'bold' }}>Tags:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                        {chipsView}
                    </View>
                    <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={[styles.smallCardStyle, { marginRight: 20 }]}>
                            <Icon size={24} color="black" name='clock-o' style={{ textAlignVertical: 'center' }} />
                            <Text style={{ fontSize: 12, marginTop: 8 }}>{data.preparationTime}</Text>
                        </View>
                        <View style={[styles.smallCardStyle, { marginRight: 20 }]}>
                            <Icon size={24} color="black" name='cogs' style={{ textAlignVertical: 'center' }} />
                            <Text style={{ fontSize: 12, marginTop: 8 }}>{data.complexity}</Text>
                        </View>
                        <View style={styles.smallCardStyle}>
                            <Icon size={24} color="black" name='group' style={{ textAlignVertical: 'center' }} />
                            <Text style={{ fontSize: 12, marginTop: 8 }}>{data.serves}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cameraIconStyle}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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