import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator, Platform, Image, Dimensions, Alert,  NetInfo, TextInput, PermissionsAndroid, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
const { width, height } = Dimensions.get('window')
import { Slider, Card, ButtonGroup } from 'react-native-elements';
import firebase from './../constants/firebase';
import uuid from 'uuid-random';
import Icon1 from 'react-native-vector-icons/AntDesign'
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
      Wallet_Balance: 0,
      date: '',
      changeVal: true,
      classVal: 3,
      passengersCount: 1,
      passengersCountHalf: 0,
      successLoad: false,
      tripID: uuid(),
      usrid: firebase.auth().currentUser.uid,
      total: 0,
      balance: 0,
    };
    this.updateClass = this.updateClass.bind(this)
    this.updateFull = this.updateFull.bind(this)
    this.updateHalf = this.updateHalf.bind(this)
    this.updateBalance = this.updateBalance.bind(this)
    this.updateTotal = this.updateTotal.bind(this)
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


  updateBalance(balance) {
    this.setState({ balance })
  }

  updateTotal(total) {
    this.setState({ total })
  }

  updateFull(passengersCount) {
    passengersCount = passengersCount + 1
    this.setState({ passengersCount })
  }

  updateHalf(passengersCountHalf) {
    passengersCountHalf = passengersCountHalf
    this.setState({ passengersCountHalf })
  }
  updateClass(classVal) {
    classVal = classVal + 1
    this.setState({ classVal })
  }

  //NEED TO CHECK WHETHER USER IS AUTHORIZID
  componentDidMount() {

   this.CheckConnectivity();

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
    firebase.database().ref("users/" + usrid).on("value", (snapshot) => {
      var newuser = snapshot.val();
      console.log("4", newuser.account_balance);
      if (newuser.account_balance < 100) {
        Alert.alert(
          'Reminder',
          'Your account is on LOW BALANCE' + this.state.Wallet_Balance + ', please recharge',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
        this.setState({ Start_App: true });
        this.setState({ Wallet_Balance: newuser.account_balance });
      }
      else {
        // console.log(newuser.)
        this.setState({ Wallet_Balance: newuser.account_balance });
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

    this.componentDidMount();
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
        const key1 = this.state.Start_Station_Name + this.state.Start_Station + obj.station_name + obj.station_id;
        const key2 = obj.station_name + obj.station_id + this.state.Start_Station_Name + this.state.Start_Station;
        console.log('key1', key1);
        firebase.database().ref("fare/" + key1 + '/' + this.state.classVal + '/').on("value", (snapshot) => {
          var fare = snapshot.val();
          console.log(fare)
          if (fare == null) {
            firebase.database().ref("fare/" + key2 + '/' + this.state.classVal + '/').on("value", (snapshot) => {
              var fare = snapshot.val();
              console.log(fare, this.state.Wallet_Balance, '------')
              const totFare = this.state.passengersCount * fare.full + this.state.passengersCountHalf * fare.half;
              const balFare = this.state.Wallet_Balance - totFare;
              console.log('2balFare', balFare, totFare)
              console.log(this.state.Wallet_Balance);
              console.log('Total Fare', totFare, 'Balance Fare', balFare);
              this.updateTotal(totFare);
              this.updateBalance(balFare);
              //fare.full and fare.half to state
              if (balFare < 0) {
                Alert.alert(
                  'Reminder',
                  'Your balance is now minus value, To continue with the service PLEASE RECHARGE now',
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                  ],
                  { cancelable: false },
                );

              }
              else if (balFare < 100) {
                Alert.alert(
                  'Reminder',
                  'Your balance is less than Rs.100, To continue the service PLEASE RECHARGE soon ',
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                  ],
                  { cancelable: false },
                );
              }
              else {
                Alert.alert(
                  'Reminder',
                  'You have successfully completed your trip',
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                  ],
                  { cancelable: false },
                );

              }
              let { Start_Station, Start_Station_Name, End_Station, End_Station_Name, classVal, usrid, passengersCount, passengersCountHalf } = this.state;


              firebase.database().ref("trips/" + usrid + "/" + this.state.tripID).set({
                user: usrid,
                start_station: Start_Station,
                start_station_name: Start_Station_Name,
                end_station: obj.station_id,
                end_station_name: obj.station_name,
                success: true,
                date: this.state.date,
                charge: totFare,
                class: classVal,
                full_passenger_count: passengersCount,
                half_passenger_count: passengersCountHalf
              })
              firebase.database().ref('users/' + usrid).update({
                account_balance: balFare
              })
              // Alert.alert(
              //   'Payment',
              //   'Your Total Cost for Trip is'+totFare,
              //   [
              //     { text: 'OK', onPress: () => console.log('OK Pressed') },
              //   ],
              //   { cancelable: false },
              // );

            });
          }
          else {
            const totFare = this.state.passengersCount * fare.full + this.state.passengersCountHalf * fare.half;
            const balFare = this.state.Wallet_Balance - totFare;
            console.log('1balFare', balFare, totFare)
            console.log(this.state.Wallet_Balance);
            console.log('Total Fare', totFare, 'Balance Fare', balFare);
            this.updateTotal(totFare);
            this.updateBalance(balFare);
            if (balFare < 0) {
              Alert.alert(
                'Reminder',
                'Your balance is now minus value, To continue with the service PLEASE RECHARGE now',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );

            }
            else if (balFare < 100) {
              Alert.alert(
                'Reminder',
                'Your balance is less than Rs.100, To continue the service PLEASE RECHARGE soon ',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );
            }
            else {
              Alert.alert(
                'Reminder',
                'You have successfully completed your trip',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );

            }
            let { Start_Station, Start_Station_Name, End_Station, End_Station_Name, classVal, usrid, passengersCount, passengersCountHalf } = this.state;


            firebase.database().ref("trips/" + usrid + "/" + this.state.tripID).set({
              user: usrid,
              start_station: Start_Station,
              start_station_name: Start_Station_Name,
              end_station: obj.station_id,
              end_station_name: obj.station_name,
              success: true,
              date: this.state.date,
              charge: totFare,
              class: classVal,
              full_passenger_count: passengersCount,
              half_passenger_count: passengersCountHalf
            })
            firebase.database().ref('users/' + usrid).update({
              account_balance: balFare
            })
          }
        }, function (error) {
          console.log("Error: " + error.code);
        });



        // const totFare = this.state.passengersCount 




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

  backtoMain = () => {
    this.setState({
      QR_Code_Value: '',
      Start_Scanner: false,
      Start_Station: '',
      Start_Station_Name: '',
      Trip_Started: false,
      End_Station: '',
      End_Station_Name: '',
      Trip_End: false,
      Access: false,
      uid: '',
      Wallet_Balance: 0,
      date: '',
      total: 0,
      balance: 0,
      changeVal: true,
      classVal: 3,
      passengersCount: 1,
      passengersCountHalf: 0,
      successLoad: false,
      tripID: uuid(),
      usrid: firebase.auth().currentUser.uid
    });
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
    const halves = ['0', '1', '2', '3', '4', '5', '6']
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
                <Text style={styles.viewstyle}>Date:{this.state.date}</Text>
                <Text style={styles.viewstyle}>From:{this.state.start_station_name}</Text>
                <Text style={styles.viewstyle}>Class:{this.state.classVal}</Text>
                <Text style={styles.viewstyle}>Tickets: Full: {this.state.passengersCount} | Half: {this.state.passengersCountHalf}</Text>
              </Card>
            </View> :  <View>
              </View>}
          <View style={styles.txtContainer}>
            <Card title={this.state.Start_Station ? 'Scan QR Code To End Your Trip' : 'Scan QR Code To Start Your Trip'}>
            <View style={{ width:'100%', flexDirection: 'row',justifyContent:'center', alignContent: 'center', alignItems: 'center', padding: 5 }}>
                <Icon1 size={30} name='mobile1' />
                <Icon1 size={30} name='arrowright' />
                <Icon1 size={30} name='qrcode' />
              </View>
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
            <Text>Your Cost Was:{this.state.total}</Text>
            <Text>Your Remaining Balance is:{this.state.balance}</Text>
            <TouchableOpacity
              onPress={this.backtoMain}
              style={styles.button}>
              <Text style={styles.buttontxt}>
                Back To Scanner
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
        <TouchableOpacity
              onPress={this.backtoMain}
              style={styles.button1}>
              <Text style={styles.buttontxt}>
                Back To Scanner
                </Text>
            </TouchableOpacity>

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
    bottom: (height / 2) - 50,
    // top: height / 2,
    // height: 150,
    alignContent: 'center',
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
  button1: {
    backgroundColor: 'black',
    borderWidth: 0.5,
    borderColor: 'white',
    height: 70,
    width: 200,
    alignSelf: 'center',
    height: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewstyle: {
    fontWeight: 'bold',
    color: 'black'
  },
  buttontxt: {
    color: 'white',
  }
});
