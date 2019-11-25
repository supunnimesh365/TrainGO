import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import firebase from './../constants/firebase';
// import { withNavigation } from 'react-navigation'; 


//NEED Validating need places

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  // componentDidMount(){
  // setTimeout(()=>{
  //     this.props.navigation.navigate('Welcome')
  // },2000);
  // }

  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Dashboard1' : 'Welcome')
      console.log(user);
    })



    // setTimeout(() => {
      // console.log(firebase.name);
      // console.log(firebase.database());
      // var user = firebase.auth().currentUser;
      // console.log(user);
      // if (user != null) {
      //   user.providerData.forEach(function (profile) {
      //     console.log("Sign-in provider: " + profile.providerId);
      //     console.log("  Provider-specific UID: " + profile.uid);
      //     console.log("  Name: " + profile.displayName);
      //     console.log("  Email: " + profile.email);
      //     console.log("  Photo URL: " + profile.photoURL);
      //     this.props.navigation.navigate('Dashboard1');
      //   });
      // }
      // else {
      //   console.log("NO USER")
      //   this.props.navigation.navigate('Login');
      // }
      // this.props.navigation.navigate('Login');
      // firebase.auth().onAuthStateChanged(function (user) {
      //   if (user) {
      //     // User is signed in.
      //     console.log(user)

      //   } else {
      //     // No user is signed in.
      //     // this.props.navigation.navigate('Login');

      //   }
      // });
    // }, 200);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
})
