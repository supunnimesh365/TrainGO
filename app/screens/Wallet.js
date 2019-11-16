import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Slider, Card, ButtonGroup } from 'react-native-elements';
import firebase from './../constants/firebase';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Wallet_Ballence: '',
      Start_App: false,
      successLoad: false
    };
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    let { successLoad } = this.state;

    const usrid = firebase.auth().currentUser.uid
    firebase.database().ref("users/" + usrid).on("value", (snapshot) => {
      var newuser = snapshot.val();
      if (newuser.account_balance < 100) {
        this.setState({ successLoad: true });
        this.setState({ Wallet_Balance: newuser.account_balance });
      }
      else {
        this.setState({ Wallet_Balance: newuser.account_balance });
        this.setState({ successLoad: true });
      }
    }, function (error) {
      console.log("Error: " + error.code);
    })
  }

  // viewing balance, history
  render() {
    if (!this.state.successLoad) {
      return (
        <View>
          <StatusBar
            translucent
            backgroundColor="#ffffff"
            barStyle="dark-content"
          />
          <Image source={require('./../assets/Train05.png')} />
          <ActivityIndicator size="large" color="blue" />
        </View>
      )
    }
    else {
      <View>
        <StatusBar
          translucent
          backgroundColor="#ffffff"
          barStyle="dark-content"
        />
        <Card>
          <Text>{this.state.Wallet_Ballence}</Text>
        </Card>
      </View>
    }
  }
}

export default Wallet;
