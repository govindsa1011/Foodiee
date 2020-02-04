import React from 'react'
import { StatusBar, Text, View, TouchableOpacity } from 'react-native'
import BottomNavigation, { IconTab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import FavoriteScreen from './favroite';
import AddNewRecipe from './addRecipe';
import SearchScreen from './search';
import ProfileScreen from './profile';
import CookingList from './cookinglist';

export default class DashBoardScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    tabs = [
        {
            key: 'home',
            label: 'Home',
            barColor: '#000000',
            pressColor: 'rgba(255, 255, 255, 0.16)',
            icon: 'home'
        },
        {
            key: 'fav',
            label: 'Favorite',
            barColor: '#f7b944',
            pressColor: 'rgba(255, 255, 255, 0.16)',
            icon: 'heart'
        },
        {
            key: 'add_recipe',
            label: 'Add Recipe',
            barColor: '#000000',
            pressColor: 'rgba(255, 255, 255, 0.16)',
            icon: 'plus-square'
        },
        {
            key: 'search',
            label: 'Search',
            barColor: '#f7b944',
            pressColor: 'rgba(255, 255, 255, 0.16)',
            icon: 'search'
        },
        {
            key: 'profile',
            label: 'Profile',
            barColor: '#000000',
            pressColor: 'rgba(255, 255, 255, 0.16)',
            icon: 'user-circle-o'
        }
    ];

    state = {
        activeTab: this.tabs[0].key,
        headerColor: '#000000',
        headerText: 'Home',
        isGrid: true,
        token : ""
    };

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    );

    renderTab = ({ tab, isActive }) => (
        <IconTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    );

    gridPress = () => {
        this.setState({
            isGrid: !this.state.isGrid
        })
    }

    componentDidMount(){
        this.setState({
            token : this.props.navigation.state.params.token
        })        
    }

    render() {
        let screenVisible;

        switch (this.state.activeTab) {
            case 'home': {
                screenVisible = <CookingList isGrid={this.state.isGrid} token={this.state.token}/>;
                break;
            }
            case 'fav': {
                screenVisible = <FavoriteScreen token={this.state.token}/>;
                break;
            }
            case 'add_recipe': {
                screenVisible = <AddNewRecipe />;
                break;
            }
            case 'search': {
                screenVisible = <SearchScreen />;
                break;
            }
            case 'profile': {
                screenVisible = <ProfileScreen />;
                break;
            }

            default: {
                screenVisible = <CookingList />
            }
        }

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar backgroundColor={this.state.headerColor} barStyle="light-content" />
                <View style={{
                    height: 48,
                    flexDirection: 'row',
                    backgroundColor: this.state.headerColor,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                        flex: 1,
                        marginStart: 34,
                        fontSize: 18,
                        fontWeight: '900'
                    }}>{this.state.headerText}</Text>

                    {this.state.headerText === "Home" ?
                        <TouchableOpacity style={{ marginEnd: 16 }} onPress={this.gridPress}>
                            <Icon size={24} color="white" name={this.state.isGrid ? "list-ul" : "th-large"} />
                        </TouchableOpacity>
                        : <View></View>}
                </View>
                <View style={{ flex: 1 }}>
                    {screenVisible}
                </View>
                <BottomNavigation
                    tabs={this.tabs}
                    activeTab={this.state.activeTab}
                    onTabPress={newTab => {
                        this.setState({
                            activeTab: newTab.key
                        });

                        switch (newTab.key) {
                            case 'home': {
                                this.setState({
                                    headerText: 'Home',
                                    headerColor: '#000000'
                                });
                                break;
                            }
                            case 'fav': {
                                this.setState({
                                    headerText: 'Favroite',
                                    headerColor: '#f7b944'
                                });
                                break;
                            }
                            case 'add_recipe': {
                                this.setState({
                                    headerText: 'Add New Recipe',
                                    headerColor: '#000000'
                                });
                                break;
                            }
                            case 'search': {
                                this.setState({
                                    headerText: 'Search',
                                    headerColor: '#f7b944'
                                });
                                break;
                            }
                            case 'profile': {
                                this.setState({
                                    headerText: 'Profile',
                                    headerColor: '#000000'
                                });
                                break;
                            }

                            default: {
                                this.setState({
                                    headerText: 'Home',
                                    headerColor: '#000000'
                                })
                            }
                        }
                    }}
                    renderTab={this.renderTab}
                    useLayoutAnimation
                />
            </View>
        )
    }
}
