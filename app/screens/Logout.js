import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator, Platform, Image, Dimensions, Alert,  NetInfo, TextInput, PermissionsAndroid, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import firebase from './../constants/firebase';
const { width, height } = Dimensions.get('window')

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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


  componentDidMount(){
    this.CheckConnectivity();
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

