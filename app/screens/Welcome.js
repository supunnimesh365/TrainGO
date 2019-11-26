import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator, Animated, Platform, Image, Dimensions, Alert,  NetInfo, TextInput, PermissionsAndroid, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';


const { width, height } = Dimensions.get('window')
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
    };
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
    this._fadeAnimation();
  }

  _fadeAnimation = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ ...StyleSheet.absoluteFill }}>
          <Image source={require('../assets/wall.png')}
            style={{ flex: 1, width: null, height: null }} />
        </View>


        <StatusBar
          translucent
          backgroundColor="#000000"
          barStyle="light-content"
        />
        <Animated.View style={[styles.animationView, { opacity: this.state.fadeValue }]}>
          <Image source={require('./../assets/Train05.png')} />
        </Animated.View>

        {/* <View style={{ ...StyleSheet.absoluteFill }}>
        </View> */}
        {/* <View style={{ height: height / 5 * 2 }}></View> */}
        <Animated.View style={[styles.btnContainer, { opacity: this.state.fadeValue }]}>
          <TouchableOpacity style={styles.button} title="Login" onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.btnText}>L o g i n</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} title="Sign Up" onPress={() => this.props.navigation.navigate('Signup')}><Text style={styles.btnText}>S i g n  U p</Text></TouchableOpacity>
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
    //backgroundColor:'#80bfff',
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
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
    padding: 20,
    // backgroundColor: 'yellow'
  },
  button: {
    backgroundColor: 'rgba(114, 178, 242, 0.6)',
    height: 50,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    borderWidth: 0.2,
    borderColor: 'black'
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '100',
  }
});
