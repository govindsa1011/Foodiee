import React from 'react'
import { View, FlatList, RefreshControl, Alert } from 'react-native'
import ListItem from './ListItem';
import * as Constant from '../utils/constants'

export default class CookingList extends React.Component {

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
                        this.setState({
                            itemArray: this.state.itemArray.filter(function (item) {
                                return item.recipeId !== id
                            })
                        });
                    }
                },
            ],
            { cancelable: false },
        );
    }

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
            itemArray: []
        }
    }

    onItemClick = (id) => {
        this.showDeleteDialog(id)
    }

    onHeartClick = (item) => {
        if(item.inCookingList==1){
            this.removeFromFavroite(item.recipeId)
        }else{
            this.addToFavroite(item.recipeId)
        }
    }

    onRefresh = () => {
        this.fetchFeeds()
    };

    addToFavroite = (recipeId) => {
        fetch(Constant.BASE_URL+Constant.ADD_TO_WISHLIST, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer "+ this.props.token,
                'Content-Type':'application/json'
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
            this.fetchFeeds()
        })
    }

    removeFromFavroite = (recipeId) => {
        fetch(Constant.BASE_URL+Constant.REMOVE_FROM_WISHLIST, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer "+ this.props.token,
                'Content-Type':'application/json'
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
            this.fetchFeeds()
        })
    }

    fetchFeeds = () => {
        this.setState({
            isLoading: true
        })

        setTimeout(()=> {
            fetch(Constant.BASE_URL+Constant.GET_FEEDS, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer "+ this.props.token
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
            },500)
        })
    }

    componentDidMount() {
        return this.fetchFeeds()
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh}></RefreshControl>
                    }
                    style={{ width: '100%' }} numColumns={this.props.isGrid ? 2 : 1} showsVerticalScrollIndicator={false} data={this.state.itemArray} renderItem={(info, index) => (
                        <ListItem
                            recipeId={info.item.recipeId}
                            itemName={info.item.name}
                            imageUrl={info.item.photo}
                            item = {info.item}
                            isGrid={this.props.isGrid}
                            isFav={info.item.inCookingList == 1}
                            isHomeScreen = {true}
                            onItemClick={this.onItemClick.bind(this)}
                            onHeartClick={this.onHeartClick.bind(this)} />
                    )}
                    keyExtractor={(item) => item.recipeId}
                    key={this.props.isGrid}>
                </FlatList>
            </View>
        )
    }
}