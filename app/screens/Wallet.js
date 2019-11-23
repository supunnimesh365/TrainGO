import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ActivityIndicator } from 'react-native';
import { Slider, Card, ButtonGroup } from 'react-native-elements';
import firebase from './../constants/firebase';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Wallet_Ballence: 0,
      Start_App: false,
      successLoad: false
    };
    this.updateWallet = this.updateWallet.bind(this)
  }

  updateWallet(Wallet_Ballence) {
    this.setState({ Wallet_Ballence })
  }

  componentDidMount() {
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
        <View style={{ flex: 1 }}>
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
          <View>
            <Card>
              <Text>{this.state.Wallet_Ballence}</Text>
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
