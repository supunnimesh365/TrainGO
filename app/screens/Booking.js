import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Slider, Card, ButtonGroup } from 'react-native-elements';

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // Booking a ticket and generate QR code
  // or authorization number
  render() {
    return (
      <View>
        <Text> Booking </Text>
      </View>
    );
  }
}

export default Booking;
