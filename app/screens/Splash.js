import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
      setTimeout(()=>{
          this.props.navigation.navigate('Welcome')
      },2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="#ffffff"
          barStyle="dark-content"
        />
        <Image source={require('./../assets/Train05.png')}/>
        <ActivityIndicator size="large" color="blue"/>
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
