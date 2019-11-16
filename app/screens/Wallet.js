import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Slider, Card, ButtonGroup } from 'react-native-elements';
import firebase from './../constants/firebase';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // viewing balance, history
  render() {
    return (
      <View>
        <Text> Wallet </Text>
      </View>
    );
  }
}

export default Wallet;
