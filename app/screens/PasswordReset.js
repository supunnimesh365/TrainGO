import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator, TouchableHighlight, Platform, Image, Dimensions, Alert, NetInfo, TextInput, PermissionsAndroid, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import firebase from './../constants/firebase';
const { width, height } = Dimensions.get('window')
import { Slider, Card, List, ListItem, ButtonGroup } from 'react-native-elements';

class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            usrid: firebase.auth().currentUser
        };
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    CheckConnectivity = () => {
        // For Android devices
        if (Platform.OS === "android") {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                } else {
                    Alert.alert("You are offline!");
                }
            });
        } else {
            // For iOS devices
            NetInfo.isConnected.addEventListener(
                "connectionChange",
                this.handleFirstConnectivityChange
            );
        }
    };

    handleFirstConnectivityChange = isConnected => {
        NetInfo.isConnected.removeEventListener(
            "connectionChange",
            this.handleFirstConnectivityChange
        );

        if (isConnected === false) {
            Alert.alert("You are offline!");
        } else {
            Alert.alert("You are online!");
        }
    };

    componentDidMount() {
        this.CheckConnectivity();
    }

    resetPassword = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email).then(function () {
            Alert.alert(
                'Success',
                'We have send you a E-mail to reset your Password',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }).catch(function (error) {
            Alert.alert(
                'Error',
                error,
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        });
    }

    render() {
        return (
            <View>
                {/* 
            passwordreset
            deleteuser
          */}
                <Card title="Reset the Password">
                    <TextInput
                        placeholder='Enter the Email'
                        style={styles.textInput}
                        placeholderTextColor='black'
                        onChangeText={val => this.onChangeText('email', val)}
                    />
                    <TouchableHighlight
                        onPress={() => this.resetPassword()}
                        style={styles.button}>
                        <Text style={styles.buttontxt}>Reset</Text>
                    </TouchableHighlight>
                    <TouchableOpacity style={styles.buttonlink} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text>back to login</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        );
    }
}

export default PasswordReset;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        marginHorizontal: 10,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgb(0,0,0)',
    },
    txtContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: height / 2,
        height: 150,
        padding: 20,
    },
    button: {
        backgroundColor: 'rgba(114, 178, 242, 0.6)',
        height: 40,
        marginHorizontal: width / 8,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
        borderWidth: 1,
        borderColor: 'black'
    },
    buttonlink: {
        height: 40,
        marginHorizontal: width / 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
    }
})

