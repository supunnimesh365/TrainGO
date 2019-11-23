import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Image, Picker, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Slider, Card, ButtonGroup } from 'react-native-elements';
import firebase from './../constants/firebase';
import DatePicker from 'react-native-datepicker';
import NumericInput from 'react-native-numeric-input'
import uuid from 'uuid-random';


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
      date: "15-05-2018",
      seats: 3,
      halfseats: 3,
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.getStationData1 = this.getStationData1.bind(this);
    this.getStationData2 = this.getStationData2.bind(this);
    this.selectStart = this.selectStart.bind(this);
    this.selectEnd = this.selectEnd.bind(this);
    this.selectTime = this.selectTime.bind(this);
    this.getTime = this.getTime.bind(this);
    this.getclass = this.getclass.bind(this);
    this.updateClass = this.updateClass.bind(this);
    this.setFullTicket = this.setFullTicket.bind(this);
    this.setHalfTicket = this.setHalfTicket.bind(this);
    this.setTotal = this.setTotal.bind(this);
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

  setTotal() {

  }

  setHalfTicket(halfseats) {
    this.setState({ halfseats })
  }

  setFullTicket(seats) {
    this.setState({ seats })
  }

  updateClass(classVal) {
    classVal = classVal + 1
    this.setState({ classVal })
    var seats = this.state.seats
    var ticketprice = this.state.selectedTime.classes
    ticketprice.forEach((snap) => {
      if (classVal == ticketprice.class) {
        var halfTicketPrice = ticketprice.half.price
        var fullTicketPrice = ticketprice.full.price
        // var totalcost = seats*fullTicketPrice + halfseats*halfTicketPrice

      }
    })
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

  bookMyTrip = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    var ticketprice = '';
    var id = uuid();
    var seatNos = [];
    let { classVal, date, seats, selectedTime } = this.state
    var tickets = selectedTime.classes;
    console.log(tickets);
    // tickets.forEach((snap)=>{
    //   if(snap.class == classVal){
    //     ticketprice = snap.price
    //   }
    //   console.log(snap);
    // })

    // var cost = seats * ticketprice
    // console.log('cost', cost);


    const usrid = firebase.auth().currentUser.uid
    // for(i=0; i<seats; i++){
    //   seatNos[i] = uuid();
    // }

    console.log(this.state.classVal);
    console.log(this.state.date);
    console.log(this.state.seats);
    console.log(this.state.selectedTime.time);
    console.log(this.state.selectedTime.trainID);
    firebase.database().ref("booked/" + usrid + '/' + id).set({
      class: classVal,
      date: date,
      seats: seats,
      status: 1,
      time: selectedTime.time,
      trainID: selectedTime.trainID,
      uid: id
    }).catch(function (error) {


    })

    // console.log(this.state.date);
    // console.log(this.state.date);
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
    const { classVal } = this.state
    // console.log('-------',this.state.data1)
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    if (!this.state.successLoad) {
      return (
        <View>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
          />
          <Image source={require('./../assets/Train05.png')} />
          <ActivityIndicator size="large" color="blue" />
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
          <ScrollView>
            <Card title="Your Booking Details">


            </Card>

            <Card title="Please select the starting station">
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
            </Card>

            <Card title="Please select the ending station">
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
            </Card>

            <TouchableHighlight
              onPress={this.getAvailableTrains}
              style={styles.button}>
              <Text style={styles.buttontxt}>Get available trains</Text>
            </TouchableHighlight>


            <Card title="Select the date">
              <DatePicker
                style={{ width: '100%' }}
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
            </Card>

            <Card title="Select the time">
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
            </Card>

            <Card title="Select the Class">
              <ButtonGroup
                onPress={this.updateClass}
                selectedIndex={classVal - 1}
                buttons={classes}
                containerStyle={{ height: 65 }}
              />
            </Card>


            <Card title="Full Seats Count">
              <View style={{ alignContent: "center", alignItems: "center", width: "100%" }}>
                <NumericInput
                  value={this.state.seats}
                  onChange={seats => this.setState({ seats })}
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  totalWidth={240}
                  totalHeight={60}
                  iconSize={20}
                  step={1}
                  minValue={1}
                  valueType='real'
                  textColor='black'
                  iconStyle={{ color: 'white' }}
                  rightButtonBackgroundColor='#2089dc'
                  leftButtonBackgroundColor='#2089dc' />
              </View>
            </Card>

            <Card title="Half Seats Count">
              <View style={{ alignContent: "center", alignItems: "center", width: "100%" }}>
                <NumericInput
                  value={this.state.halfseats}
                  onChange={halfseats => this.setState({ halfseats })}
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  totalWidth={240}
                  totalHeight={60}
                  iconSize={20}
                  step={1}
                  minValue={1}
                  valueType='real'
                  textColor='black'
                  iconStyle={{ color: 'white' }}
                  rightButtonBackgroundColor='#2089dc'
                  leftButtonBackgroundColor='#2089dc' />
              </View>
            </Card>
            {/* get these inputs and save it to DB */}
            <TouchableHighlight
              onPress={this.bookMyTrip}
              style={styles.button}>
              <Text style={styles.buttontxt}>Book My Trip</Text>
            </TouchableHighlight>
            {/* my bookings new page */}
          </ScrollView>

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
    margin: 10,
    justifyContent: 'center',
  },
  buttontxt: {
    color: 'white',
  }
});