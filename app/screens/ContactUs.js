import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Dimensions } from 'react-native';
import firebase from './../constants/firebase';
const { width, height } = Dimensions.get('window')
import { Slider, Card, List, ListItem, ButtonGroup } from 'react-native-elements';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.container} title="Contact Us">
          <Image source={require('./../assets/Train05.png')} />
          <View style={{alignItems: "center", alignContent: "center"}}>
            <Text style={{fontWeight:"bold"}}> +9470 489 40 53 </Text>
            <Text style={{fontWeight:"bold"}}> traingo@admin.lk </Text>
            <Text style={{fontWeight:"bold"}}> www.traingo.lk </Text>
            <Text style={{fontWeight:"bold"}} > 3, Negombo Road, Wattala, Sri-Lanka</Text>
          </View>
        </Card>
      </View>
    );
  }
}

export default ContactUs;

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

