import React, { Component } from 'react';
//import {View, Text} from 'react-native';
import {
    View,
    Text,
    Button,
    Image,
    StatusBar,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import uuid from 'uuid-random';
import firebase from './../constants/firebase';
const { width, height } = Dimensions.get('window')
export default class Signup extends Component {


    
//NEED Validating need places

    state = {
        username: '', password: '', email: '', phone_number: '', success: false
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }





    signUp = () => {
        // {username, password} = this.state
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() =>
            this.props.navigation.navigate('Dashboard1'),

        ).catch(function (error) {
            // Handle Errors here.
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

        

    }



    render() {
        if (this.state.success == false) {
            return (
                <View style={styles.container}>
                    <View style={{ ...StyleSheet.absoluteFill }}>
                        <Image source={require('../assets/wall.png')}
                            style={{ flex: 1, width: null, height: null }} />
                    </View>
                    <StatusBar
                        translucent
                        backgroundColor="#000000"
                        barStyle="light-content"
                    />
                    <View style={styles.txtContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Username'
                            autoCapitalize="none"
                            onChangeText={val => this.onChangeText('username', val)}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder='Password'
                            secureTextEntry={true}
                            autoCapitalize="none"
                            onChangeText={val => this.onChangeText('password', val)}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder='Email'
                            autoCapitalize="none"
                            onChangeText={val => this.onChangeText('email', val)}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder='Phone Number'
                            autoCapitalize="none"
                            onChangeText={val => this.onChangeText('phone_number', val)}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => this.signUp()}>
                            <Text>S I G N  U P</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <StatusBar
                        translucent
                        backgroundColor="#ffffff"
                        barStyle="dark-content"
                    />
                    <Image source={require('./../assets/Train05.png')} />
                    <ActivityIndicator size="large" color="blue" />
                </View>
            )
        }
    }
}

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

