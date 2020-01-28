import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

showDeleteDialog = () => {
    Alert.alert(
        '',
        'Are you sure want to delete?',
        [
            {
                text: 'No',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => console.log('Yes Pressed') },
        ],
        { cancelable: false },
    );
}

const listItem = (props) => (
    <View style={{ alignItems: 'center', flex: props.isGrid ? 1 / 2 : 1 }}>
        <View style={styles.bg_shadow}>
            <ImageBackground source={props.imageUrl != null ? { uri: props.imageUrl } : require('../images/temp.jpg')} style={[styles.imgStyle, { height: props.isGrid ? 150 : 250 }]} imageStyle={{ borderRadius: 10 }} resizeMode="cover">
                <View style={styles.transparentBg}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ padding: 10, color: 'white', fontSize: props.isGrid ? 12 : 18 }}>{props.itemName}</Text>
                    </View>
                    <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{ marginEnd: 16 }} >
                            <Icon size={props.isGrid ? 16 : 24} color={props.isFav ? 'red' : 'white'} name='heart' />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginEnd: 16 }} onPress={this.showDeleteDialog}>
                            <Icon size={props.isGrid ? 16 : 24} color="white" name='trash' />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    </View>
)

const styles = StyleSheet.create({
    bg_shadow: {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        margin: 10,
        elevation: 8,
    },
    imgStyle: {
        width: "100%",
        justifyContent: 'flex-end'
    },
    transparentBg: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row'
    }
})

export default listItem