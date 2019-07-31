import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

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
        <Image source={require('./../assets/Group_2.png')}/>
        <Text>Train GO</Text>
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
