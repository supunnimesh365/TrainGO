/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Navigation from './app/navigation';
import * as constants from './app/constants';
import { Block } from './app/components';


type Props = {

};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Train GO</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header:{
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    marginBottom: 90,
    color: 'grey',
  }
});
