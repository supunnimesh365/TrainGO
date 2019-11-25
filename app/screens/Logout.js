import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar,ActivityIndicator,Image, Dimensions } from 'react-native';
import firebase from './../constants/firebase';
const { width, height } = Dimensions.get('window')

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  render() {
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
    );
  }
}

export default Logout;

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

