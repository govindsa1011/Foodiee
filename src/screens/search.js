import React from 'react'
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ListItem from './ListItem';
import * as Constant from '../utils/constants'
import ProgressLoader from 'rn-progress-loader';

export default class SearchScreen extends React.Component {

    state = {
        strText: "",
        itemArray: [],
        isLoading: false
    }

    showDeleteDialog = (id) => {
        Alert.alert(
            '',
            'Are you sure want to delete?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: () => {
                        this.deleteItem(id)
                    }
                },
            ],
            { cancelable: false },
        );
    }

    deleteItem = (recipeId) => {
        this.setState({
            isLoading: true
        })

        fetch(Constant.BASE_URL + recipeId, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': "Bearer " + this.props.token
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                return null
            }
        }).then((responseJson) => {
            console.log("Delete Response:- " + responseJson);

            this.setState({
                itemArray: this.state.itemArray.filter(function (item) {
                    return item.recipeId !== recipeId
                }),
                isLoading: false
            });

        })
    }

    txtChangeHangler = (value) => {
        if(value===''){
            this.setState({
                itemArray:[]
            })
        }

        this.setState({
            strText: value
        })
    }

    onDeleteClick = (id) => {
        this.showDeleteDialog(id)
    }

    onItemClick = (info) => {
        this.props.navigation.navigate("Detail", { data: info, token: this.props.token })
    }

    onHeartClick = (item) => {
        if (item.inCookingList == 1) {
            this.removeFromFavroite(item.recipeId)
        } else {
            this.addToFavroite(item.recipeId)
        }
    }

    addToFavroite = (recipeId) => {
        fetch(Constant.BASE_URL + Constant.ADD_TO_WISHLIST, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'recipeId': recipeId
                }
            )
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                return null
            }
        }).then((responseJson) => {
            console.log(responseJson)
            this.fetchCookingList()
        })
    }

    removeFromFavroite = (recipeId) => {
        fetch(Constant.BASE_URL + Constant.REMOVE_FROM_WISHLIST, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'recipeId': recipeId
                }
            )
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                return null
            }
        }).then((responseJson) => {
            console.log(responseJson)
            this.fetchCookingList()
        })
    }

    searchClick = () => {
        if (this.state.strText.trim() === '') {
            return
        } else {
            this.fetchCookingList()
        }
    }

    fetchCookingList = () => {
        this.setState({
            isLoading: true
        })

        fetch(Constant.BASE_URL + Constant.SEARCH_RECIPE + this.state.strText, {
            method: 'GET',
            headers: {
                'Authorization': this.props.token
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                return null
            }
        }).then((responseJson) => {
            this.setState({
                isLoading: false,
                itemArray: responseJson.map(function (item) {
                    return {
                        recipeId: item.recipeId,
                        name: item.name,
                        photo: item.photo,
                        preparationTime: item.preparationTime,
                        serves: item.serves,
                        complexity: item.complexity,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        inCookingList: item.inCookingList
                    };
                })
            })
        })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", backgroundColor: 'rgba(246, 252, 255, 1)' }}>
                <ProgressLoader
                    visible={this.state.isLoading}
                    isModal={true} isHUD={true}
                    hudColor={"#000000"}
                    color={"#FFFFFF"} />

                <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput style={styles.input}
                        placeholder='Search here...'
                        placeholderTextColor='rgba(0,0,0,0.5)'
                        returnKeyType='search'
                        autoCorrect={false}
                        value={this.state.strText}
                        onChangeText={this.txtChangeHangler} />

                    <TouchableOpacity style={styles.circleShadow} onPress={() => this.searchClick()}>
                        <Icon size={24} color='black' name='search' />
                    </TouchableOpacity>
                </View>
                {this.state.itemArray.length !== 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        style={{ width: '100%' }}
                        initialNumToRender={this.state.itemArray.length}
                        numColumns={this.props.isGrid ? 2 : 1} showsVerticalScrollIndicator={false} data={this.state.itemArray} renderItem={(info, index) => (
                            <ListItem
                                recipeId={info.item.recipeId}
                                itemName={info.item.name}
                                imageUrl={info.item.photo}
                                item={info.item}
                                isGrid={false}
                                isFav={info.item.inCookingList == 1}
                                isHomeScreen={false}
                                onItemClick={this.onItemClick.bind(this)}
                                onDeleteClick={this.onDeleteClick.bind(this)}
                                onHeartClick={this.onHeartClick.bind(this)} />
                        )}
                        keyExtractor={(item, index) => String(index)}>
                    </FlatList>
                </View> : <View>
                        <View style={{ flex: 0.9, alignItems: "center", justifyContent: "center" }}>
                            <Image style={{ width: 100, height: 100 }} source={require('../images/shake.gif')} />
                            <Text style={{ color: 'black', marginTop: 12, fontSize: 18, fontFamily: 'Poppins-Bold' }}>No Data Found</Text>
                        </View>
                    </View>}
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
        fontFamily: 'Poppins-Medium',
        paddingBottom: 5,
        fontSize: 12,
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: 20,
        marginBottom: 20,
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
        marginBottom:20,
        marginStart: 16
    }
})