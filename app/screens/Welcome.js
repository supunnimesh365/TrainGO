import React, { Component } from 'react';
import { View, Text, StatusBar, Button, StyleSheet, Image, Dimensions, Animated, TouchableOpacity } from 'react-native';


const { width, height } = Dimensions.get('window')
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this._fadeAnimation();
  }

  _fadeAnimation = () =>{
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  render() {
    return (
      <View  style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="#80bfff"
          barStyle="dark-content"
        />
        <Animated.View style={[styles.animationView,  {opacity: this.state.fadeValue}]}>
          <Image source={require('./../assets/Train05.png')} />
        </Animated.View>

        {/* <View style={{ ...StyleSheet.absoluteFill }}>
        </View> */}
        {/* <View style={{ height: height / 5 * 2 }}></View> */}
        <Animated.View style={[styles.btnContainer, {opacity: this.state.fadeValue}]}>
          <TouchableOpacity style={styles.button} title="Login" onPress={() => this.props.navigation.navigate('Dashboard')}><Text>Login</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} title="Sign Up" onPress={() => this.props.navigation.navigate('Signup')}><Text>Sign Up</Text></TouchableOpacity>
        </Animated.View>
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
    backgroundColor:'#80bfff',
  },
  header: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    marginBottom: 90,
    color: 'black',
  },
  btnContainer: {
    position: 'absolute',
    left:0,
    right: 0,
    bottom: 0,
    height: 200,
    padding: 20,
    // backgroundColor: 'yellow'
  },
  button: {
    backgroundColor: '#003366',
    height: 50,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  btnText:{
    
  }
});
