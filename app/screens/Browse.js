import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator, Platform, Image, ScrollView, TouchableHighlight, Dimensions, Alert,  NetInfo, TextInput, PermissionsAndroid, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Slider, Card, List, ListItem, ButtonGroup } from 'react-native-elements';
import firebase from './../constants/firebase';
import QRCode from 'react-native-qrcode-svg';

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usrid: firebase.auth().currentUser.uid,
      booking: [],
      successLoad: false,
      QRload: false,
      idVal: []
    };
    this.getBookings = this.getBookings.bind(this);
    this.setQRloadStatus = this.setQRloadStatus.bind(this);
    this.setQR = this.setQR.bind(this);
    this.getQR = this.getQR.bind(this);
  }

  setQR(idVal) {
    this.setState({ idVal });
  }

  setQRloadStatus(QRload) {
    this.setState({ QRload });
  }

  getBookings(booking) {
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

  getQR(data) {
    console.log(data);
    //userid
    var data1 = {
      "uid":this.state.usrid,
      "bookid":data
    }
    data1 = JSON.stringify(data1);
    this.setQR(data1);
    this.setQRloadStatus(true);
  }

  backtoView(){
    this.setQRloadStatus(false);
    this.componentDidMount();
  }

  WholeNews() {
    const { booking } = this.state
    var that = this
    var show = false
    return booking.map(function (book, i) {

      return (
        <View key={i}>
          {book.status == 1 ?
            <Card>
              <Text></Text>
              <View>
                <Text>Your Unique ID:{book.uid}</Text>
                <Text>Date:{book.date}</Text>
                <Text>Class:{book.class}</Text>
                <Text>Seats: Full-{book.fullseats}| half-{book.halfseats}</Text>
                <Text>Time:{book.time}</Text>
                <Text>Train ID:{book.trainID}</Text>
                <TouchableHighlight
                  onPress={() => that.getQR(book.uid)}
                  style={styles.button}>
                  <Text style={styles.buttontxt}>View QR to confirm</Text>
                </TouchableHighlight>
                {/* {!show ?
                  <QRCode
                    style={styles.QR}
                    value={book.uid}
                    size={200}
                    logoSize={100}
                    logoBackgroundColor='transparent'
                  />:<View></View>
                } */}
              </View>

            </Card> :
            <View></View>}
        </View>
      );
    });
  }


  render() {

    const { booking } = this.state
    console.log(booking);
    if (this.state.successLoad == true && this.state.QRload == false) {
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
    else if (this.state.QRload == true) {
      return (
        <View style={styles.container}>
          <QRCode
            style={styles.QR}
            value={this.state.idVal}
            size={200}
            logoSize={100}
            logoBackgroundColor='transparent'
          />
          <TouchableHighlight
            onPress={()=>this.backtoView()}
            style={styles.button}>
            <Text style={styles.buttontxt}>Back to View</Text>
          </TouchableHighlight>
        </View>
      )
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