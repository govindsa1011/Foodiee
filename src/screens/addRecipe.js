import React from 'react'
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import {ChipInput} from 'material-ui-chip-input';

export default class AddNewRecipe extends React.Component {
    state = {
        chipsItems: []
    }

    handleAddChip = (chip) => {
        chipsItems.push(chip)
    }

    handleDeleteChip = (chip, index) => {
        // var array = [...this.state.chipsItems];
        // if (index !== -1) {
        //     array.splice(index, 1);
        //     this.setState({ chipsItems: array });
        // }
    }

    render() {
        let preprationTimeArray = [{
            value: 'Minutes',
        }, {
            value: 'Hours',
        }, {
            value: 'Day',
        }];

        let complexityArray = [{
            value: 'Normal',
        }, {
            value: 'Medium',
        }, {
            value: 'Complex',
        }];

        return (
            <ScrollView style={styles.mainContainer}>
                <View style={[styles.mainContainer, { alignItems: 'center' }]}>
                    <TextInput style={styles.input}
                        placeholder='Name'
                        placeholderTextColor='#808080'
                        keyboardType='default'
                        returnKeyType='next'
                        autoCorrect={false} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TextInput style={[styles.inputSmall, { marginRight: 10 }]}
                            placeholder='Prepration Time'
                            placeholderTextColor='#808080'
                            keyboardType='numeric'
                            returnKeyType='next'
                            autoCorrect={false} />
                        <View style={[styles.dropDownStyle, { marginRight: 10 }]}>
                            <Dropdown
                                animationDuration={100}
                                containerStyle={{ marginTop: 10, marginStart: 10 }}
                                dropdownOffset={{ top: 0, left: 0 }}
                                rippleInsets={{ top: 0, bottom: 0 }}
                                value={preprationTimeArray[0].value}
                                data={preprationTimeArray} />
                        </View>
                    </View>
                    <TextInput style={[styles.input, { marginTop: 0 }]}
                        placeholder='Number of Serves'
                        placeholderTextColor='#808080'
                        keyboardType='numeric'
                        returnKeyType='next'
                        autoCorrect={false} />
                    <View style={[styles.dropDownStyle, { width: '85%', marginTop: 10 }]}>
                        <Dropdown
                            label="Complexity"
                            animationDuration={100}
                            containerStyle={{ marginTop: 10 }}
                            dropdownOffset={{ top: 0, left: 0 }}
                            rippleInsets={{ top: 0, bottom: 0 }}
                            value={complexityArray[0].value}
                            data={complexityArray} />
                    </View>

                    <View style={{ width: '85%', marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tags:</Text>
                        {/* <ChipInput
                            value={this.state.chipsItems}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip, index) => handleDeleteChip(chip, index)}
                        /> */}
                    </View>

                    <TouchableOpacity style={styles.submitButtonStyle}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#ffffff'
    },
    input: {
        width: "90%",
        height: 40,
        margin: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: '#000000',
        paddingStart: 20,
        paddingHorizontal: 10
    },
    inputSmall: {
        width: "54%",
        height: 40,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: '#000000',
        paddingStart: 20,
        paddingHorizontal: 10
    },
    dropDownStyle: {
        width: "30%",
        height: 40,
        justifyContent: 'center',
        color: '#000000'
    },
    submitButtonStyle: {
        width: 350,
        height: 40,
        marginTop: 60,
        marginBottom: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        borderRadius: 20,
        elevation: 3,
        color: 'white',
        justifyContent: 'center',
        backgroundColor: '#000000'
    }
})