import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, TouchableHighlight, TextInput, StatusBar, Image, Dimensions } from 'react-native';
import firebase from './../constants/firebase';
const { width, height } = Dimensions.get('window')
import { Slider, Card, List, ListItem, ButtonGroup } from 'react-native-elements';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      usrid: firebase.auth().currentUser
    };
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  resetPassword = () => {
    if (this.state.email == firebase.auth().currentUser.email) {
      firebase.auth().sendPasswordResetEmail(this.state.email).then(function () {
        Alert.alert(
          'Success',
          'We have send you a E-mail to reset your Password',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      }).catch(function (error) {
        Alert.alert(
          'Error',
          error,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      });
    }
    else {
      Alert.alert(
        'Error',
        'This is not your email, Please check again',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
  }

  deleteAccount = () => {
    firebase.auth().currentUser.delete().then(function() {
      Alert.alert(
        'Success',
        'We have deleted your account',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }).catch(function(error) {
      Alert.alert(
        'Failed',
        'We were unable to delete your account',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    });
  }

  render() {
    return (
      <View>
        {/* 
            passwordreset
            deleteuser
          */}
        <Card title="Reset the Password">
          <TextInput
            placeholder='Enter the Email'
            style={styles.textInput}
            placeholderTextColor='black'
            onChangeText={val => this.onChangeText('email', val)}
          />
          <TouchableHighlight
            onPress={() => this.resetPassword()}
            style={styles.button}>
            <Text style={styles.buttontxt}>Reset</Text>
          </TouchableHighlight>
        </Card>
        <Card title="Delete Your Profile">
          <Text></Text>
          <TouchableHighlight
            onPress={() => this.deleteAccount()}
            style={styles.button}>
            <Text style={styles.buttontxt}>Delete Account</Text>
          </TouchableHighlight>
        </Card>

      </View>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 10,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgb(0,0,0)',
  },
  txtContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: height / 2,
    height: 150,
    padding: 20,
  },
  button: {
    backgroundColor: 'rgba(114, 178, 242, 0.6)',
    height: 40,
    marginHorizontal: width / 8,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonlink: {
    height: 40,
    marginHorizontal: width / 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  }
})
