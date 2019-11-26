import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, StatusBar, Image, Picker, ActivityIndicator, TouchableHighlight } from 'react-native';
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
      classVal: '',
      date: "15-05-2018",
      seats: 1,
      halfseats: 0,
      selector: true,
      halfTicketPrice: 0,
      fullTicketPrice: 0,
      totalPrice: 0,
      wallet: 0,
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
    this.setwallet = this.setwallet.bind(this);
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

  setTotal(totalPrice) {
    this.setState({ totalPrice })
  }

  setwallet(wallet) {
    this.setState({ wallet })
  }

  setHalfTicket(halfTicketPrice) {
    this.setState({ halfTicketPrice })
  }

  setFullTicket(fullTicketPrice) {
    this.setState({ fullTicketPrice })
  }

  updateClass(classVal) {
    this.setHalfTicket(0);
    this.setFullTicket(0);
    this.setTotal(0);
    //this.setwallet(0);
    let { halfseats, seats, wallet } = this.state
    classVal = classVal + 1
    this.setState({ classVal })
    // var seats = this.state.seats
    var ticketprice = this.state.selectedTime.classes
    ticketprice.forEach((snap) => {
      if (classVal == snap.class) {
        var halfTicketPrice = snap.half.price
        var fullTicketPrice = snap.full.price
        this.setHalfTicket(halfTicketPrice);
        this.setFullTicket(fullTicketPrice);
        var totalcost = seats * fullTicketPrice + halfseats * halfTicketPrice;
        //var balance = wallet - totalcost;
        console.log('+++', totalcost);
        this.setTotal(totalcost);
        //this.setwallet(balance);
        console.log(halfTicketPrice, fullTicketPrice, wallet);

      }
    })
  }

  componentDidMount() {
    // this.updateClass();
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
    firebase.database().ref('users/' + this.state.usrid).on("value", (snapshot) => {
      var childwall = snapshot.val()
      console.log('--', childwall.account_balance)
      this.setwallet(childwall.account_balance);
    },
      function (error) {
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
    firebase.database().ref("bookingDetails/" + this.state.selectedStationStart.name + this.state.selectedStationStart.id + this.state.selectedStationEnd.name + this.state.selectedStationEnd.id+"/").on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        items.push(childData);
      })
      this.getTime(items);
      console.log(items);
      if (items.length == 0) {
        //Alert
      }
      else {
        this.setState({ selector: false })
      }
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
    let { classVal, date, seats, selectedTime, usrid, wallet, halfseats, totalPrice } = this.state
    var tickets = selectedTime.classes;
    if (today < date) {
      console.log(tickets);
      console.log(this.state.classVal);
      console.log(this.state.date);
      console.log(this.state.seats);
      console.log(this.state.selectedTime.time);
      console.log(this.state.wallet);
      console.log(this.state.totalPrice);
      var balance = wallet - totalPrice
      console.log(balance);
      firebase.database().ref("booked/" + usrid + '/' + id).set({
        class: classVal,
        date: date,
        fullseats: seats,
        halfseats: halfseats,
        status: 1,
        time: selectedTime.time,
        trainID: selectedTime.trainID,
        uid: id
      })
      firebase.database().ref('users/' + usrid).update({
        account_balance: balance
      })
      Alert.alert(
        'Confirmation',
        'You have successfully booked a Ticket, Please visit Drawer booking section to view',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
      this.setState({ selector: true });
    }
    else {
      Alert.alert(
        'Warning',
        'You have selected a previous date, please select future date',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }


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
        <View style={styles.container}>
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
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 5 }}>
                <Text style={{ alignSelf: "flex-start" }}>Date:</Text><Text style={{ alignSelf: "flex-end" }}>{this.state.date}</Text>
              </View>
              <Text style={styles.viewstyle}>From:{this.state.selectedStationStart.name}</Text>
              <Text style={styles.viewstyle}>To:{this.state.selectedStationEnd.name}</Text>
              <Text style={styles.viewstyle}>Tickets: Full: {this.state.seats}|Half:{this.state.halfseats}</Text>
              <Text style={styles.viewstyle}>Class:{this.state.classVal}</Text>
              <Text style={styles.viewstyle}>Price: Full:{this.state.fullTicketPrice}</Text>
              <Text style={styles.viewstyle}>Price: Half:{this.state.halfTicketPrice}</Text>
              <Text style={styles.viewstyle}>{this.state.seats}X{this.state.fullTicketPrice}+{this.state.halfseats}X{this.state.halfTicketPrice}</Text>
              <Text style={styles.viewstyle}>Total Cost: {this.state.seats * this.state.fullTicketPrice + this.state.halfseats * this.state.halfTicketPrice}</Text>

              {!this.state.selector ?
                <TouchableHighlight
                  onPress={this.bookMyTrip}
                  style={styles.button}>
                  <Text style={styles.buttontxt}>Book My Trip</Text>
                </TouchableHighlight>
                : <Text>First Get Available Trains to Continue with your Booking</Text>}
            </Card>

            {this.state.selector ?
              <ScrollView>
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
                          <Picker.Item label={item.name} value={item} key={item.name} />
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
                          <Picker.Item label={item.name} value={item} key={item.name} />
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
              </ScrollView> : <ScrollView></ScrollView>}


            {!this.state.selector ?
              <ScrollView>
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

              </ScrollView> : <ScrollView></ScrollView>}
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
  },
  viewstyle: {
    fontWeight: 'bold',
    color: 'black'
  }
});