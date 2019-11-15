import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator, Platform, Image, Dimensions, Alert, TextInput, PermissionsAndroid, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
const { width, height } = Dimensions.get('window')
import { Slider, Card, ButtonGroup } from 'react-native-elements';
import firebase from './../constants/firebase';
import uuid from 'uuid-random';

// station device QRcode change daily
// get value for trip (Ex: Kandana676768Maradana909090)
// calculate for all the passengers
// generate uuid and to DB record
// reduce it from balance
// QR Code generated in the screen => it also have this things uuid
// start station end station passengercount class uuid => DB
// 
// compare all of them
// 
// 
//
// send it to DB
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QR_Code_Value: '',
      Start_Scanner: false,
      Start_App: false,
      Start_Station: '',
      Start_Station_Name: '',
      Trip_Started: false,
      End_Station: '',
      End_Station_Name: '',
      Trip_End: false,
      Access: false,
      uid: '',
      Wallet_Balance: '',
      date: '',
      changeVal: true,
      classVal: 3,
      passengersCount: 1,
      passengersCountHalf: 1,
      successLoad: false,
      tripID: uuid()

    };
    this.updateClass = this.updateClass.bind(this)
    this.updateFull = this.updateFull.bind(this)
    this.updateHalf = this.updateHalf.bind(this)
  }

  updateFull(passengersCount) {
    passengersCount = passengersCount + 1
    this.setState({ passengersCount })
  }

  updateHalf(passengersCountHalf) {
    passengersCountHalf = passengersCountHalf + 1
    this.setState({ passengersCountHalf })
  }
  updateClass(classVal) {
    classVal = classVal + 1
    this.setState({ classVal })
  }

  //NEED TO CHECK WHETHER USER IS AUTHORIZID
  componentDidMount() {

    //var that = this;
    var user = firebase.auth().currentUser;
    let { QR_Code_Value,
      Start_Scanner,
      Start_Station,
      Trip_Started,
      End_Station,
      Trip_End,
      uid,
      Wallet_Balance } = this.state;

    const usrid = firebase.auth().currentUser.uid
    firebase.database().ref("users/" + usrid).on("value", function (snapshot) {
      var newuser = snapshot.val();
      console.log("4", newuser.account_balance);
      if (newuser.Wallet_Balance < 100) {
        Alert.alert(
          'Reminder==',
          'Your account is on LOW BALANCE' + this.state.Wallet_Balance + ', please recharge',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
        this.setState({ Start_App: true });
      }
      else{
        this.setState({Wallet_Balance:newuser.Wallet_Balance});
      }
    }, function (error) {
      console.log("Error: " + error.code);
    });


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
        this.setState({ Start_Station_Name: obj.station_name });
        this.setState({ date: obj.date });
        this.setState({ changeVal: false });
      }
      else {
        this.setState({ End_Station: obj.station_id });
        this.setState({ End_Station_Name: obj.station_name });
        this.setState({ Trip_End: true });
        const key1 = this.state.Start_Station_Name+this.state.Start_Station+obj.station_name+obj.station_id;
        const key2 = obj.station_name+obj.station_id+this.state.Start_Station_Name+this.state.Start_Station;
        console.log('key1',key1);
        firebase.database().ref("fare/" + key1+'/'+this.state.classVal+'/').on("value", function (snapshot) {
          var fare = snapshot.val();
          console.log(fare)
          Alert.alert(
            'Reminder=='+fare,
            'Your account is on LOW BALANCE, please recharge',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
          );
        },function(error){

        })


        firebase.database().ref('trips/' + this.state.tripID).set({
          // username: username,
          // email: email,
          // phone_number: phone_number,
          // account_balance: 0
        })
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

  // saveInfo = () => {
  //   console.log(this.state.Start_Station);
  //   console.log(this.state.classVal);
  //   console.log(this.state.passengersCount);
  //   // create uid and save to DB
  //   this.setState({ changeVal: true });
  // }

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
    const classes = ['Class 1', 'Class 2', 'Class 3']
    const halves = ['1', '2', '3', '4', '5', '6']
    const full = ['1', '2', '3', '4', '5', '6']
    const { classVal } = this.state
    const { passengersCount } = this.state
    const { passengersCountHalf } = this.state
    if (!this.state.Start_Scanner && this.state.Start_App && !this.state.Trip_End) {

      return (
        <View style={[styles.container]}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#ffffff"
          />
          {this.state.QR_Code_Value ?
            <View style={styles.ticketContainer}>
              <Card title="Ticket">
                <Text>Date:{this.state.date}</Text>
                <Text>From:{this.state.Start_Station}</Text>
                <Text>Class:{this.state.classVal}</Text>
                <Text>Tickets: Full: {this.state.passengersCount} | Half: {this.state.passengersCountHalf}</Text>
              </Card>
            </View> : <View></View>}
          <View style={styles.txtContainer}>
            <Card title={this.state.Start_Station ? 'Scan QR Code To End Your Trip' : 'Scan QR Code To Start Your Trip'}>
              <TouchableOpacity
                onPress={this.open_QR_Code_Scanner}
                style={styles.button}>
                <Text style={styles.buttontxt}>
                  Open QR Scanner
            </Text>
              </TouchableOpacity>
            </Card>
            {/* <Text style={styles.paragraph}>
              {this.state.Start_Station ? 'Scan QR Code To End Your Trip' : 'Scan QR Code To Start Your Trip'}
            </Text> */}

          </View>
          {/* <Text style={styles.QR_text}>
            {this.state.QR_Code_Value ? 'Your Trip has started \n' +
              'Date:' + this.state.QR_Code_Value.date + '\n' +
              'Start Station:' + this.state.Start_Station + '\n' : ''}
          </Text> */}


          {this.state.changeVal ?
            <View></View> : <View style={styles.newContainer}>
              <Card title="Edit Your Details">

                <ButtonGroup
                  onPress={this.updateHalf}
                  selectedIndex={passengersCountHalf - 1}
                  buttons={halves}
                  containerStyle={{ height: 50 }}
                />
                <ButtonGroup
                  onPress={this.updateFull}
                  selectedIndex={passengersCount - 1}
                  buttons={full}
                  containerStyle={{ height: 50 }}
                />
                <ButtonGroup
                  onPress={this.updateClass}
                  selectedIndex={classVal - 1}
                  buttons={classes}
                  containerStyle={{ height: 65 }}
                />
                {/* <TouchableOpacity
                  onPress={this.saveInfo}
                  style={styles.button}>
                  <Text style={styles.buttontxt}>
                    OK
                  </Text>
                </TouchableOpacity> */}
              </Card>
            </View>
          }

        </View>
      );
    }
    else if (!this.state.Start_App) {
      return (
        <View style={{ backgroundColor: 'Black' }}><Text>Please confirm email to continue with</Text></View>
      )
    }
    else if (this.state.Trip_End) {
      return (
        <View style={styles.txtContainer}>
          <Card title="You have completed the journey">
            <TouchableOpacity
              // onPress={this.open_QR_Code_Scanner}
              style={styles.button}>
              <Text style={styles.buttontxt}>
                Pay Now
                </Text>
            </TouchableOpacity>
          </Card>
        </View>
      )
    }
    else if (this.state.successLoad) {
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  paragraph: {
    fontSize: 10,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
  newContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "stretch",
  },
  txtContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: (height / 2)-50,
    // top: height / 2,
    // height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    // bottom: 0,
    top: 0,
    height: 150,
  },
  btnContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    height: 150,
    padding: 20,
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
    alignSelf: 'center',
    height: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontxt: {
    color: 'white',
  }
});