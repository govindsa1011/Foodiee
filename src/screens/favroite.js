import React from 'react'
import { View, FlatList, RefreshControl, Alert } from 'react-native'
import ListItem from './ListItem';
import * as Constant from '../utils/constants'
import ProgressLoader from 'rn-progress-loader';

export default class FavoriteScreen extends React.Component {

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
            isDeleting: true
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
                isDeleting: false
            });

        })
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            itemArray: [],
            isDeleting: false
        }
    }

    onDeleteClick = (id) => {
        this.showDeleteDialog(id)
    }

    onItemClick = (info) => {
        this.props.navigation.navigate("Detail", { data: info, token: this.props.token })
    }

    onHeartClick = (item) => {
        this.removeFromFavroite(item.recipeId)
    }

    onRefresh = () => {
        this.fetchCookingList()
    };

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

    fetchCookingList = () => {
        this.setState({
            isLoading: true
        })

        fetch(Constant.BASE_URL + Constant.GET_FAV_COOKING_LIST, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + this.props.token
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
                    };
                })
            })
        })
    }

    componentDidMount() {
        return this.fetchCookingList()
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ProgressLoader
                    visible={this.state.isDeleting}
                    isModal={true} isHUD={true}
                    hudColor={"#000000"}
                    color={"#FFFFFF"} />
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh}></RefreshControl>
                    }
                    style={{ width: '100%' }}
                    initialNumToRender={this.state.itemArray.length}
                    numColumns={this.props.isGrid ? 2 : 1} showsVerticalScrollIndicator={false} data={this.state.itemArray} renderItem={(info, index) => (
                        <ListItem
                            recipeId={info.item.recipeId}
                            itemName={info.item.name}
                            imageUrl={info.item.photo}
                            item={info.item}
                            isGrid={false}
                            isFav={true}
                            isHomeScreen={false}
                            onItemClick={this.onItemClick.bind(this)}
                            onDeleteClick={this.onDeleteClick.bind(this)}
                            onHeartClick={this.onHeartClick.bind(this)} />
                    )}
                    keyExtractor={(item, index) => String(index)}>
                </FlatList>
            </View>
        )
    }
}