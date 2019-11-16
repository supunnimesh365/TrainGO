import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Slider, Card, ButtonGroup } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';


export default class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Wallet_Ballence: '',
      Start_App: false,
      successLoad: false,
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  // Booking a ticket and generate QR code
  // or authorization number
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={this.onDateChange}
        />

        <View>
          <Text>SELECTED DATE:{startDate}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});