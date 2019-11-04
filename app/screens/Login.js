import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, StatusBar } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from './../constants/firebase';


//NEED Validating need places
const { width, height } = Dimensions.get('window')
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  Login = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Dashboard1'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }


  render() {
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
            placeholder='PHONE NUMBER'
            style={styles.textInput}
            placeholderTextColor='black'
            onChangeText={val => this.onChangeText('email', val)}
          />
          <TextInput
            placeholder='PASSWORD'
            style={styles.textInput}
            placeholderTextColor='black'
            onChangeText={val => this.onChangeText('password', val)}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.Login()}>
            <Text>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonlink} onPress={() => this.props.navigation.navigate('Signup')}>
            <Text>NOT REGISTERED</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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

