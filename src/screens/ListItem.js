import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class listItem extends React.Component {

    state = {
        isLoading: true
    }

    render() {
        return (
            <View style={{ alignItems: 'center', flex: this.props.isGrid ? 1 / 2 : 1 }}>
                <View style={styles.bg_shadow}>
                    <TouchableWithoutFeedback onPress={() => this.props.onItemClick(this.props.item)}>
                        <ImageBackground onLoad={() => {
                            this.setState({
                                isLoading: false
                            })
                        }}
                            source={this.props.imageUrl != null ? { uri: this.props.imageUrl } : require('../images/placeholder.gif')}
                            style={[styles.imgStyle, { height: this.props.isGrid ? 150 : 250 }]}
                            imageStyle={{ borderRadius: 10 }}
                            resizeMode="cover">

                            {this.state.isLoading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                                <ActivityIndicator size="small" color={this.props.isHomeScreen ? "#000000" : "#f7c744"} />
                            </View> : <View></View>}

                            <View style={styles.transparentBg}>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ padding: 10, color: 'white', fontSize: this.props.isGrid ? 12 : 18 }}>{this.props.itemName}</Text>
                                </View>
                                <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity style={{ marginEnd: 16 }} onPress={() => this.props.onHeartClick(this.props.item)}>
                                        <Icon size={this.props.isGrid ? 16 : 24} color={this.props.isFav ? 'red' : 'white'} name='heart' />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginEnd: 16 }} onPress={() => this.props.onDeleteClick(this.props.recipeId)}>
                                        <Icon size={this.props.isGrid ? 16 : 24} color="white" name='trash' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}

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
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row'
    }
})

export default listItem