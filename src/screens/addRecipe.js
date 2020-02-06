import React from 'react'
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import ReactChipsInput from 'react-native-chips';
import * as Constant from '../utils/constants'

export default class AddNewRecipe extends React.Component {
    state = {
        strName: "", isNameValid: true,
        strPreprationTime: "", isTimeValid: true,
        strNumOfServes: "", isNumValid: true,
        tagsArray: [],
        isLoading: false
    }

    txtNameChangeHangler = (val) => {
        this.setState({
            strName: val
        })
    }

    txtTimeChangeHangler = (val) => {
        this.setState({
            strPreprationTime: val
        })
    }

    txtNoServerChangeHangler = (val) => {
        this.setState({
            strNumOfServes: val
        })
    }

    changeChips = (chips) => {
        // console.log(this.refs.chipInput.state.chip);
    }

    btnSubmitClick = () => {

        if (this.state.strName.trim() === "") {
            this.setState({
                isNameValid: false
            })
        } else {
            this.setState({
                isNameValid: true
            })
        }

        if (this.state.strPreprationTime.trim() === "") {
            this.setState({
                isTimeValid: false
            })
        } else {
            this.setState({
                isTimeValid: true
            })
        }

        if (this.state.strNumOfServes.trim() === "") {
            this.setState({
                isNumValid: false
            })
        } else {
            this.setState({
                isNumValid: true
            })
        }

        setTimeout(() => {

            console.log(this.refs.chipInput.state.chips);

            if (this.state.isNameValid && this.state.isTimeValid && this.state.isNumValid) {

                this.setState({
                    isLoading: true
                })

                fetch(Constant.BASE_URL + Constant.ADD_RECIPE, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': "Bearer " + this.props.token
                    },
                    body: JSON.stringify({
                        'name': this.state.strName,
                        'preparationTime': this.state.strPreprationTime + " " + this.refs.dropdownTime.selectedItem().value,
                        'serves': this.state.strNumOfServes,
                        'complexity': this.refs.dropdownComplexity.selectedItem().value,
                        'metaTags': this.refs.chipInput.state.chips
                    })
                }).then((response) => {
                    if (response.status == 200) {
                        return response.json()
                    } else {
                        return null
                    }
                }).then((responseJson) => {
                    console.log(responseJson);
                    this.setState({
                        strName: "", isNameValid: true,
                        strPreprationTime: "", isTimeValid: true,
                        strNumOfServes: "", isNumValid: true,
                        tagsArray: [],
                        isLoading: false
                    })

                    if (responseJson != null) {
                        console.log("Success")
                    } else {
                        console.log("Something went wrong");
                    }
                })
            }
        }, 100)
    }

    render() {
        let preprationTimeArray = [{
            value: 'minutes',
        }, {
            value: 'hours',
        }, {
            value: 'day',
        }];

        let complexityArray = [{
            value: 'Easy',
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
                        placeholderTextColor={this.state.isNameValid ? "#808080" : "#f7c744"}
                        keyboardType='default'
                        returnKeyType='next'
                        autoCorrect={false}
                        value={this.state.strName}
                        onChangeText={this.txtNameChangeHangler}
                        onSubmitEditing={() => this.refs.txtTime.focus()} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TextInput style={[styles.inputSmall, { marginRight: 10 }]}
                            placeholder='Prepration Time'
                            placeholderTextColor={this.state.isTimeValid ? "#808080" : "#f7c744"}
                            keyboardType='numeric'
                            returnKeyType='next'
                            autoCorrect={false}
                            value={this.state.strPreprationTime}
                            onChangeText={this.txtTimeChangeHangler}
                            onSubmitEditing={() => this.refs.dropdownTime.focus()}
                            ref={"txtTime"} />
                        <View style={[styles.dropDownStyle, { marginRight: 10 }]}>
                            <Dropdown
                                animationDuration={100}
                                ref={"dropdownTime"}
                                containerStyle={{ marginTop: 10, marginStart: 10 }}
                                dropdownOffset={{ top: 0, left: 0 }}
                                rippleInsets={{ top: 0, bottom: 0 }}
                                value={preprationTimeArray[0].value}
                                data={preprationTimeArray} />
                        </View>
                    </View>
                    <TextInput style={[styles.input, { marginTop: 0 }]}
                        placeholder='Number of Serves'
                        placeholderTextColor={this.state.isNumValid ? "#808080" : "#f7c744"}
                        keyboardType='numeric'
                        returnKeyType='next'
                        autoCorrect={false}
                        value={this.state.strNumOfServes}
                        onChangeText={this.txtNoServerChangeHangler}
                        onSubmitEditing={() => this.refs.dropdownComplexity.focus()} />

                    <View style={[styles.dropDownStyle, { width: '85%', marginTop: 10 }]}>
                        <Dropdown
                            label="Complexity"
                            ref={"dropdownComplexity"}
                            animationDuration={100}
                            containerStyle={{ marginTop: 10 }}
                            dropdownOffset={{ top: 0, left: 0 }}
                            rippleInsets={{ top: 0, bottom: 0 }}
                            value={complexityArray[0].value}
                            data={complexityArray} />
                    </View>

                    <View style={{ width: '85%' }}>
                        <ReactChipsInput label="Add Tags"
                            onChangeChips={(chips) => this.changeChips(chips)}
                            alertRequired={false}
                            ref={"chipInput"}
                            chipStyle={{ borderColor: 'black', backgroundColor: 'white' }} />

                    </View>

                    {this.state.isLoading ? <ActivityIndicator size="large" color="#000000" style={{marginTop:60}} /> : 
                    <TouchableOpacity style={styles.submitButtonStyle} onPress={() => this.btnSubmitClick()}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Submit</Text>
                    </TouchableOpacity>}
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