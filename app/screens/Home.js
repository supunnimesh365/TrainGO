import React, { Component } from 'react';
import { View, StatusBar, Platform, Dimensions, Alert, PermissionsAndroid, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
const { width, height } = Dimensions.get('window')
import firebase from './../constants/firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QR_Code_Value: '',
      Start_Scanner: false,
      Start_App: false,
      Start_Station: '',
      Trip_Started: false,
      End_Station: '',
      Trip_End: false,
      Access: false,
      uid: '',
      Wallet_Balance: '',
      date: '',
      changeVal: true
    };
  }


  //NEED TO CHECK WHETHER USER IS AUTHORIZID
  componentDidMount() {
    var user = firebase.auth().currentUser;
    let { QR_Code_Value,
      Start_Scanner,
      Start_Station,
      Trip_Started,
      End_Station,
      Trip_End } = this.state;
    this.setState({ uid: firebase.auth().currentUser.uid });
    //get trip end false one from the DB


    // get data from the Database
    if (firebase.auth().currentUser.emailVerified == false) {
      Alert.alert(
        'Reminder',
        'Please confirm your e-mail to continue with our services',
        [
          { text: 'OK', onPress: () => user.sendEmailVerification() },
        ],
        { cancelable: false },
      );
      this.setState({ Start_App: false });
    }
    else {
      this.setState({ Start_App: true });
    }
    // check account verified, account balance
    // show alerts to verify and to top up
  }


  onQR_Code_Scan_Done = (QR_Code) => {
    if (!QR_Code.startsWith('{')) {
      Alert.alert(
        'Warning',
        'This is not a correEct QR code',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    } else {
      this.setState({ Start_Scanner: false });
      var obj = JSON.parse(QR_Code);
      this.setState({ QR_Code_Value: obj });
      // console.log(obj.station_id);
      if (!obj.station_id) {
        Alert.alert(
          'Warning',
          'This is not a correct QR code',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      }
      if (this.state.Start_Station == '') {
        this.setState({ Start_Station: obj.station_id });
        this.setState({ date: obj.date });
        this.setState({ changeVal: false });
      }
      else {
        this.setState({ End_Station: obj.station_id });
        this.setState({ Trip_End: true });
      }
    }

    // recent travel details getting
    // send the starting station
    // send the ending station then
    // calculate the price
    // passenger, type, child, set
    // finalysing the travel
    // reduce prive and display tick mark
  }

  changeValues = () => {
    Alert.alert(
      'Confirmation',
      'Going to change default values',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  open_QR_Code_Scanner = () => {

    var that = this;

    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
            'title': 'Camera App Permission',
            'message': 'Camera App needs access to your camera '
          }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            that.setState({ QR_Code_Value: '' });
            that.setState({ Start_Scanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      that.setState({ QR_Code_Value: '' });
      that.setState({ Start_Scanner: true });
    }
  }

  render() {
    if (!this.state.Start_Scanner && this.state.Start_App && !this.state.Trip_End) {

      return (
        <View style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#ffffff"
          />
          <Text style={{ fontSize: 22, textAlign: 'center' }}>
            {this.state.Start_Station ? 'Scan QR Code To End Your Trip' : 'Scan QR Code To Start Your Trip'}
          </Text>
          <Text style={styles.QR_text}>
            {this.state.QR_Code_Value ? 'Your Trip has started \n' +
              'Date:' + this.state.QR_Code_Value.date + '\n' +
              'Start Station:' + this.state.Start_Station + '\n' : ''}
          </Text>
          <TouchableOpacity
            onPress={this.changeValues}
            style={this.state.changeVal ? {
              backgroundColor: '#D3D3D3',
              height: 70,
              width: 200,
              height: 50,
              marginHorizontal: 20,
              borderRadius: 35,
              alignItems: 'center',
              justifyContent: 'center',
            } : {
                backgroundColor: 'black',
                height: 70,
                width: 200,
                height: 50,
                marginHorizontal: 20,
                borderRadius: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            disabled={this.state.changeVal}
          // activeOpacity={this.state.changeVal?0.1:0.9}
          >
            <Text style={styles.buttontxt}>
              Edit details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.open_QR_Code_Scanner}
            style={styles.button}>
            <Text style={styles.buttontxt}>
              Open QR Scanner
            </Text>
          </TouchableOpacity>

        </View>
      );
    }
    else if (!this.state.Start_App) {
      return (
        <View><Text>Please confirm email to continue with</Text></View>
      )
    }
    else if (this.state.Trip_End) {
      return (
        <View>
          <Text>Your have completed your Trip</Text>
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
        />
        <CameraKitCameraScreen
          showFrame={true}
          scanBarcode={true}
          laserColor={'#FF3D00'}
          frameColor={'#00C853'}
          colorForScannerFrame={'black'}
          cameraOptions={{
            flashMode: 'auto',             // on/off/auto(default)
            focusMode: 'on',               // off/on(default)
            zoomMode: 'on',                // off/on(default)
            ratioOverlay: '1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
            ratioOverlayColor: '#00000077' // optional
          }}
          onReadCode={event =>
            this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
            // this.setState({ Start_Scanner: false })
          }
        />

      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  paragraph: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    marginBottom: 90,
    color: 'black',
  },
  QR_text: {
    color: '#000',
    fontSize: 19,
    padding: 8,
    marginTop: 12
  },
  button: {
    backgroundColor: 'black',
    height: 70,
    width: 200,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontxt: {
    color: 'white',
  }
});
