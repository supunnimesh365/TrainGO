import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator, Platform, Image, Dimensions, Alert,  NetInfo, TextInput, PermissionsAndroid, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Slider, Card, ButtonGroup } from 'react-native-elements';
import firebase from './../constants/firebase';
import QRCode from 'react-native-qrcode-svg';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Wallet_Ballence: 0,
      Start_App: false,
      successLoad: false,
      usrid: firebase.auth().currentUser.uid,
    };
    this.updateWallet = this.updateWallet.bind(this)
  }

  updateWallet(Wallet_Ballence) {
    this.setState({ Wallet_Ballence })
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
    //var user = firebase.auth().currentUser;
    //let { successLoad } = this.state;
    //let { Wallet_Balance } = this.state;
    const usrid = firebase.auth().currentUser.uid
    firebase.database().ref("users/" + usrid).on("value", (snapshot) => {
      var newuser = snapshot.val();
      console.log(newuser);
      if (newuser.account_balance < 100) {
        this.updateWallet(newuser.account_balance);
        this.setState({ successLoad: true });
        console.log(newuser.account_balance, this.state.Wallet_Ballence)
      }
      else {
        this.updateWallet(newuser.account_balance);
        this.setState({ successLoad: true });
        console.log(newuser.account_balance, this.state.Wallet_Ballence)
      }
    }, function (error) {
      console.log("Error: " + error.code);
    })
  }

  // viewing balance, history
  render() {
    // console.log(this.state.Wallet_Ballence);
    if (!this.state.successLoad) {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
          />
          <View>
            <Image source={require('./../assets/Train05.png')} />
            <ActivityIndicator size="large" color="blue" />

          </View>

        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
          />
          <View style={styles.container}>
            <Card>
              <Text>Your Available Balance is:{this.state.Wallet_Ballence}</Text>
            </Card>
            <QRCode
              style={styles.QR}
              value={this.state.usrid}
              size={200}
              logoSize={100}
              logoBackgroundColor='transparent'
            />
            <Card>
              <Text>Use this QR Code to topup your account</Text>
            </Card>
          </View>

        </View>
      );
    }
  }
}

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

// export default Wallet;
