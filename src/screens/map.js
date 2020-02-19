import React from 'react'
import { View, Image } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'

export default class MapComponent extends React.Component {

    constructor() {
        super()
    }

    static navigationOptions = {
        header: null
    };

    state = {
        coordinatesArr: [
            {
                key: 0,
                latitude: 23.025719,
                longitude: 72.503360
            },
            {
                key: 1,
                latitude: 23.025739,
                longitude: 72.503027
            },
            {
                key: 2,
                latitude: 23.025778,
                longitude: 72.502716
            },
            {
                key: 3,
                latitude: 23.025867,
                longitude: 72.502577
            },
            {
                key: 4,
                latitude: 23.026134,
                longitude: 72.502619
            },
            {
                key: 5,
                latitude: 23.026470,
                longitude: 72.502662
            },
            {
                key: 6,
                latitude: 23.026716,
                longitude: 72.502684
            },
            {
                key: 7,
                latitude: 23.027032,
                longitude: 72.502716
            },
            {
                key: 8,
                latitude: 23.027467,
                longitude: 72.502770
            },
            {
                key: 9,
                latitude: 23.027664,
                longitude: 72.502802
            },
            {
                key: 10,
                latitude: 23.027654,
                longitude: 72.503242
            },
            {
                key: 11,
                latitude: 23.027625,
                longitude: 72.503682
            },
            {
                key: 12,
                latitude: 23.027585,
                longitude: 72.504111
            },
            {
                key: 13,
                latitude: 23.027575,
                longitude: 72.504529
            },
            {
                key: 14,
                latitude: 23.027575,
                longitude: 72.505012
            },
            {
                key: 15,
                latitude: 23.027487,
                longitude: 72.505677
            },
            {
                key: 16,
                latitude: 23.027447,
                longitude: 72.506321
            },
            {
                key: 17,
                latitude: 23.027388,
                longitude: 72.506611
            },
            {
                key: 18,
                latitude: 23.027368,
                longitude: 72.506975
            },
            {
                key: 19,
                latitude: 23.027299,
                longitude: 72.507201
            }
        ]
    }

    componentDidMount() {
        this.updateLocation(0, this.state.coordinatesArr.length)
    }

    updateLocation = (key, arrLength) => {
        if (arrLength == 0) {
            alert("Reached!")
            return
        }
        setTimeout(() => {
            this.setState({
                coordinatesArr: this.state.coordinatesArr.filter(function (item) {
                    return item.key !== key
                })
            });
            key++
            this.updateLocation(key, this.state.coordinatesArr.length)
        }, 1000)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    ref={MapView => (this.MapView = MapView)}
                    initialRegion={{
                        latitude: 23.025836,
                        longitude: 72.503349,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    style={{ flex: 1 }}
                    loadingEnabled={true}
                    loadingIndicatorColor="#666666"
                    loadingBackgroundColor="#eeeeee"
                    moveOnMarkerPress={false}
                    showsUserLocation={true}
                    showsCompass={true}
                    showsPointsOfInterest={false}
                    provider="google"
                    showsUserLocation={true}
                >

                    {this.state.coordinatesArr.length > 0 ?
                        <Polyline
                            strokeWidth={5}
                            strokeColor='black'
                            coordinates={this.state.coordinatesArr}
                        >

                        </Polyline> : <View></View>}
                    {this.state.coordinatesArr.length > 0 ?
                        <Marker
                            coordinate={this.state.coordinatesArr[0]}
                            tracksViewChanges={false}
                            title='Way to The Grand Thakkar'
                            anchor={{ x: 0.5, y: 0.8 }}
                            description='Route drawing from solution analysts to The Grand Thakkar'
                            identifier='1'
                        >
                            <View>
                                <Image style={{ width: 40, height: 40 }} source={require('../images/marker.png')} />
                            </View>
                        </Marker> : <View></View>}
                </MapView>
            </View>
        )
    }
}