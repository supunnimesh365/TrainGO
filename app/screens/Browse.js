import React, { Component } from 'react';
import { View, Text, StatusBar, FlatList, SectionList, ListView, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Slider, Card, List, ListItem, ButtonGroup } from 'react-native-elements';
import firebase from './../constants/firebase';


class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usrid: firebase.auth().currentUser.uid,
      booking: [],
      successLoad: false,
    };
    this.getBookings = this.getBookings.bind(this);
  }

  getBookings(booking) {
    this.setState({ booking });
  }

  componentDidMount() {
    var items = []
    firebase.database().ref("booked/" + this.state.usrid).on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        items.push(childData);
      })
      console.log(items);
      this.getBookings(items);
      this.setState({ successLoad: true });
    })
  }

  WholeNews() {
    const {booking} = this.state
    return booking.map(function(book, i){

      return(
        <View key={i}>
          {book.status == 1?
          <Card>
          <Text>{book.trainID}</Text>
          <View>
            <Text>{book.uid}</Text>
          </View>
          
          </Card>:
          <View></View>}
        </View>
      );
    });
  }


  render() {

    const { booking } = this.state
    console.log(booking);
    if (this.state.successLoad == true) {
      return (
        <ScrollView>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
          />
          <View>
            {this.WholeNews()}
          </View>
        </ScrollView>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <StatusBar
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

export default Browse;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'black',
    height: 70,
    width: 200,
    alignSelf: 'center',
    height: 50,
    borderRadius: 35,
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center',
  },
  buttontxt: {
    color: 'white',
  }
});