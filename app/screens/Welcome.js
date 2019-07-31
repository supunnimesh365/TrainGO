import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.header}> Welcome </Text>
        <Button title="Login" onPress={()=> this.props.navigation.navigate('Dashboard')}></Button>
        <Button title="Sign Up" onPress={()=> alert('button Pressed')}></Button>
      </View>
    );
  }
}

export default Welcome;

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
    color: 'black',
  }
});
