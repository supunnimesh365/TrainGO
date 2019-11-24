/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
//import Navigation from './app/navigation/index';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons'
import Home from './app/screens/Home'
import Booking from './app/screens/Booking'
import Wallet from './app/screens/Wallet';
import Signup from './app/screens/Signup';
import WelcomeScreen from './app/screens/Welcome';
import * as constants from './app/constants';
import { Block } from './app/components';
import Icon1 from 'react-native-vector-icons/AntDesign'
import Splash from './app/screens/Splash';
import Login from './app/screens/Login';
import Browse from './app/screens/Browse';
import firebase from './app/constants/firebase';


//NEED Validating need places

class App extends Component{

  // componentWillMount(){
  //   // Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyDzBchctm2VgacqpThTN0FRRHfwZSuaoZM",
  //   authDomain: "traingoapp.firebaseapp.com",
  //   databaseURL: "https://traingoapp.firebaseio.com",
  //   projectId: "traingoapp",
  //   storageBucket: "traingoapp.appspot.com",
  //   messagingSenderId: "646862527248",
  //   appId: "1:646862527248:web:b26022c7603ce35497e395"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  // console.log(firebase);
  // }



  render(){
    return (
      <AppContainer/>
    );
  }
}

export default App;

const DashboardTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: { screen: Home,  
      navigationOptions:{  
          tabBarLabel:'Home',  
          tabBarIcon: ({ tintColor }) => (  
              <View>  
                  <Icon1 style={[{color: tintColor}]} size={20} name='home'/>  
              </View>), 
       } 
      },
      Wallet: { screen: Wallet,
        navigationOptions:{
          tabBarLabel:'Wallet',
          tabBarIcon: ({ tintColor}) => (
            <View>
                <Icon1 style={[{color:tintColor}]} size={20} name='wallet'/>
            </View>),
        },
      },
      Booking: { screen: Booking,
        
        navigationOptions:{
          tabBarLabel:'Booking',
          tabBarIcon: ({ tintColor}) => (
            <View>
              <Icon1 style={[{color:tintColor}]} size={20} name='book'/>
            </View>),
        },
      },
  },
  {  
    initialRouteName: "Home",  
    activeColor: '#2683c6',  
    inactiveColor: 'black',  
    fontWeight: 'bald',
    barStyle: { backgroundColor: 'white' }, 
    navigationOptions:({navigation})=>{
      const {routeName} = navigation.state.routes[navigation.state.index]
      return{
        headerTitle:routeName
      };
    } 
  },
);

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator : DashboardTabNavigator

},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:
        <Icon style={{paddingLeft:10, color:'#000000'}}
        onPress={()=>navigation.openDrawer()}
        size={30} name='md-menu'/>
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard:{
    screen:DashboardStackNavigator
  },
  Browse:{
    screen:Browse
  }
  // Signup:{
  //   screen:Signup
  // }
});

const AppSwitchNavigator = createSwitchNavigator({
  Splash:{screen:Splash},
  Welcome:{screen:WelcomeScreen},
  Dashboard1:{screen:AppDrawerNavigator},
  Signup:{screen:Signup},
  Login:{screen:Login},
  Dashboard:{screen:DashboardStackNavigator},
  Browse:{screen:Browse}
});



const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //color: 'black',
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
