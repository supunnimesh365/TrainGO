import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Picker, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Slider, Card, ButtonGroup } from 'react-native-elements';
import firebase from './../constants/firebase';
import DatePicker from 'react-native-datepicker';
//import { TouchableHighlight } from 'react-native-gesture-handler';
// import CalendarPicker from 'react-native-calendar-picker';
// const data = [
//   {
//     "name": "stephen1",
//     "id": "1234"
//   },
//   {
//     "name": "stephen2",
//     "id": "1235"
//   },
//   {
//     "name": "stephen3",
//     "id": "1236"
//   },
// ]

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Wallet_Ballence: '',
      Start_App: false,
      successLoad: false,
      selectedStartDate: null,
      usrid: firebase.auth().currentUser.uid,
      selectedStationStart: 'Select Starting Station',
      selectedStationEnd: 'Select Ending Station',
      selectedTime: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      classVal: 3,
      date: "15-05-2018"
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.getStationData1 = this.getStationData1.bind(this);
    this.getStationData2 = this.getStationData2.bind(this);
    this.selectStart = this.selectStart.bind(this);
    this.selectEnd = this.selectEnd.bind(this);
    this.selectTime = this.selectTime.bind(this);
    this.getTime = this.getTime.bind(this);
    this.getclass = this.getclass.bind(this);
  }


  selectStart(selectedStationStart) {
    this.setState({ selectedStationStart })
    console.log('1111', selectedStationStart)
  }

  selectEnd(selectedStationEnd) {
    this.setState({ selectedStationEnd })
    console.log('2222', selectedStationEnd)
  }

  selectTime(selectedTime) {
    this.setState({ selectedTime })
  }

  getclass(data4) {
    this.setState({ data4 })
  }

  getTime(data3) {
    this.setState({ data3 })
  }

  getStationData1(data1) {
    this.setState({ data1 })
  }

  getStationData2(data2) {
    this.setState({ data2 })
  }

  updateClass(classVal) {
    classVal = classVal + 1
    this.setState({ classVal })
  }

  componentDidMount() {
    var items = []
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    this.setState({ date: today })
    firebase.database().ref("stations/").on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        items.push(childData);
      })
      this.getStationData1(items);
      this.getStationData2(items);
      this.setState({ successLoad: true });

    }, function (error) {
      console.log("Error:" + error.code);
    })

  }

  SampleFunction = (item) => {
    Alert.alert(item);
  }

  getAvailableTrains = () => {
    //get trains
    //times show
    //update booked
    //update seats
    var items = []
    console.log('33333', this.state.selectedStationStart, '344444', this.state.selectedStationEnd, '453656');
    firebase.database().ref("bookingDetails/" + this.state.selectedStationStart + this.state.selectedStationEnd + "/").on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        items.push(childData);
      })
      this.getTime(items);
      // this.getclass(items);
      // console.log(details);
      //this.setState({ stations: details });
    }, function (error) {
      console.log("Error:" + error.code);
    })
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  // Booking a ticket and generate QR code
  // or authorization number
  render() {
    const { selectedStartDate } = this.state;
    const { data1, data2, data3, data4 } = this.state;
    const classes = ['class1', 'class2', 'class3']
    // console.log('-------',this.state.data1)
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    if (!this.state.successLoad) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
          />
          <View>
            <Image source={require('./../assets/Train05.png')} />
            <ActivityIndicator size="large" color="blue" />

          </View>

        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#ffffff"
          />
          <View>
            <Text>Please select the starting station</Text>
            <Picker mode="dropdown"
              selectedValue={this.state.selectedStationStart}
              onValueChange={(itemValue) =>
                this.selectStart(itemValue)
              }
            >
              {
                data1.map((item) => {
                  return (
                    <Picker.Item label={item.name} value={item.name + item.id} key={item.name} />
                  );
                })
              }
            </Picker>

            <Text>Please select the ending station</Text>

            <Picker mode="dropdown"
              selectedValue={this.state.selectedStationEnd}
              onValueChange={(itemValue) =>
                this.selectEnd(itemValue)
              }

            >
              {
                data2.map((item) => {
                  return (
                    <Picker.Item label={item.name} value={item.name + item.id} key={item.name} />
                  );
                })
              }
            </Picker>


            <TouchableHighlight
              onPress={this.getAvailableTrains}
              style={styles.button}>
              <Text style={styles.buttontxt}>Get available trains</Text>
            </TouchableHighlight>

            <Text>Select the date</Text>
            <DatePicker
              style={{ width: 200 }}
              date={this.state.date} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-01-2016"
              maxDate="01-01-2020"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(date) => { this.setState({ date: date }) }}
            />
            <Text>Select the time</Text>

            <Picker mode="dropdown"
              selectedValue={this.state.selectedTime}
              onValueChange={(itemValue) =>
                this.selectTime(itemValue)
              }

            >
              {
                data3.map((item) => {
                  return (
                    <Picker.Item label={item.time} value={item} key={item.time} />
                  );
                })
              }
            </Picker>

            <Text>Select the Class</Text>

            <ButtonGroup
              onPress={this.updateClass}
              selectedIndex={classVal - 1}
              buttons={classes}
              containerStyle={{ height: 65 }}
            />

            <Text>Seats</Text>

            {/* get these inputs and save it to DB */}
            {/* my bookings new page */}
          </View>

        </View>
      )
    }
  }
}

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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