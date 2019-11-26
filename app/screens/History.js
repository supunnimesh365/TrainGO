import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator,ScrollView, TouchableHighlight, Platform, Image, Dimensions, Alert,  NetInfo, TextInput, PermissionsAndroid, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import firebase from './../constants/firebase';
import { Slider, Card, List, ListItem, ButtonGroup } from 'react-native-elements';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usrid: firebase.auth().currentUser.uid,
      booking: [],
      successLoad: false,
      QRload: false,
      idVal: ''
    };
    this.getTrips = this.getTrips.bind(this);
  }

  getTrips(booking) {
    this.setState({ booking });
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


  componentDidMount() {
    this.CheckConnectivity();
    var items = []
    firebase.database().ref("trips/" + this.state.usrid + '/').on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        items.push(childData);
      })
      console.log(items);
      this.getTrips(items);
      this.setState({ successLoad: true });
    })
  }


  WholeNews() {
    const { booking } = this.state
    var that = this
    var show = false
    return booking.map(function (book, i) {

      return (
        <View key={i}>
          <Card>
            <Text></Text>
            <View>
              <Text>Start Station:{book.end_station_name}</Text>
              <Text>End Station:{book.start_station_name}</Text>
              <Text>Date:{book.date}</Text>
              <Text>Class:{book.class}</Text>
              <Text>Seats: Full-{book.full_passenger_count}| half-{book.half_passenger_count}</Text>
              <Text>Price:{book.charge}</Text>

            </View>

          </Card>
        </View>
      );
    });
  }
  // color scheme
  // profile details changing
  // payment options

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

export default History;

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