import React from 'react'
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class SearchScreen extends React.Component {

    state = {
        strText: ""
    }

    txtChangeHangler = (value) => {
        this.setState({
            strText: value
        })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput style={styles.input}
                        placeholder='Search here...'
                        placeholderTextColor='rgba(0,0,0,0.5)'
                        returnKeyType='search'
                        autoCorrect={false}
                        value={this.state.strText}
                        onChangeText={this.txtChangeHangler} />

                    <TouchableOpacity style={styles.circleShadow}>
                        <Icon size={24} color='black' name='search' />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.9, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ width: 150, height: 150 }} source={require('../images/empty_box.png')} />
                    <Text style={{ color: 'black', marginTop: 12, fontSize: 18, fontWeight: 'bold' }}>No Data Found</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: "75%",
        height: 40,
        paddingStart: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: 20,
        elevation: 8,
    },
    circleShadow: {
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderRadius: 30,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
        marginTop: 20,
        marginStart: 16
    }
})