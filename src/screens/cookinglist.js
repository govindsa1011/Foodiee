import React from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import ListItem from './ListItem';

export default class CookingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            itemArray: []
        }
    }

    onRefresh = () => {
        this.fetchCookingList()
    };

    fetchCookingList = () => {
        this.setState({
            isLoading: true
        })

        fetch("http://35.160.197.175:3006/api/v1/recipe/cooking-list", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s'
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

            console.log(this.state.itemArray)
        })
    }

    componentDidMount() {
        return this.fetchCookingList()
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh}></RefreshControl>
                    }
                    style={{ width: '100%' }} numColumns={this.props.isGrid?2:1} showsVerticalScrollIndicator={false} data={this.state.itemArray} renderItem={(info,index) => (
                        <ListItem itemName={info.item.name}
                            imageUrl={info.item.photo}
                            isGrid={this.props.isGrid}
                            isFav={false} />
                    )}
                    keyExtractor={(item) => item.recipeId}
                    key = {this.props.isGrid}>
                </FlatList>
            </View>
        )
    }
}