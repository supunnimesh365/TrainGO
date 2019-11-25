/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,Image, StyleSheet, SafeAreaView, ScrollView, Dimensions, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
//import Navigation from './app/navigation/index';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
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
import tripHistory from './app/screens/History';
import Settings from './app/screens/Settings';
import Logout from './app/screens/Logout';
import Contactus from './app/screens/ContactUs';
import firebase from './app/constants/firebase';
import ContactUs from './app/screens/ContactUs';


//NEED Validating need places

class App extends Component{

  render(){
    return (
      <AppContainer/>
    );
  }
}

export default App;
 
const headerComponent = props => {
  return(
  <SafeAreaView style={{flex:1}}>
    <View style={{height:200, backgroundColor:'white', alignItems:"center", justifyContent:"center"}}>
      <Image source = {require('./app/assets/logo.png')} style={{height:120, width
      :120, borderRadius: 20, backgroundColor:"grey"}}/>
      <Text>TrainGO v1.0</Text>
      <Text>eazy pay, eazy way</Text>
    </View>
    <ScrollView> 
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)}

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

const BrowseStackNavigator = createStackNavigator({
  Browse : {
    screen:Browse
  }
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:
        <Icon style={{paddingLeft:10, color:'#000000'}}
        onPress={()=>navigation.openDrawer()}
        size={30} name='md-menu'/>,
      headerTitle:'Recent Bookings'
    }
  }
})

const HistoryStackNavigator = createStackNavigator({
  tripHistory : {
    screen:tripHistory
  }
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:
        <Icon style={{paddingLeft:10, color:'#000000'}}
        onPress={()=>navigation.openDrawer()}
        size={30} name='md-menu'/>,
      headerTitle:'Travel History'
    }
  }
})

const SettingStackNavigator = createStackNavigator({
  Settings : {
    screen:Settings
  }
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:
        <Icon style={{paddingLeft:10, color:'#000000'}}
        onPress={()=>navigation.openDrawer()}
        size={30} name='md-menu'/>,
      headerTitle:'Settings'
    }
  }
})

const LogoutStackNavigator = createStackNavigator({
  Logout : {
    screen:Logout
  }
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:
        <Icon style={{paddingLeft:10, color:'#000000'}}
        onPress={()=>navigation.openDrawer()}
        size={30} name='md-menu'/>,
      headerTitle:'Logging Out'
    }
  }
})

const ContactStackNavigator = createStackNavigator({
  ContactUs : {
    screen:ContactUs
  }
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:
        <Icon style={{paddingLeft:10, color:'#000000'}}
        onPress={()=>navigation.openDrawer()}
        size={30} name='md-menu'/>,
      headerTitle:'Contact Us'
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard:{
    screen:DashboardStackNavigator,
    navigationOptions:{
      title:'Home',
      drawerIcon: ({ tintColor}) => (
        <View>
          <Icon1 style={[{color:tintColor}]} size={20} name='home'/>
        </View>),
    },
  },
  Browse:{
    screen:BrowseStackNavigator,
    navigationOptions:{
      title:'Train Bookings',
      drawerIcon: ({ tintColor}) => (
        <View>
          <Icon1 style={[{color:tintColor}]} size={20} name='book'/>
        </View>),
    },
  },
  tripHistory:{
    screen:HistoryStackNavigator,
    navigationOptions:{
      title:'Travel History',
      drawerIcon: ({ tintColor}) => (
        <View>
          <Icon1 style={[{color:tintColor}]} size={20} name='database'/>
        </View>),
    },
  },
  Settings:{
    screen:SettingStackNavigator,
    navigationOptions:{
      title:'Settings',
      drawerIcon: ({ tintColor}) => (
        <View>
          <Icon1 style={[{color:tintColor}]} size={20} name='setting'/>
        </View>),
    },
  },
  ContactUs:{
    screen:ContactStackNavigator,
    navigationOptions:{
      title:'Contact Us',
      drawerIcon: ({ tintColor}) => (
        <View>
          <Icon1 style={[{color:tintColor}]} size={20} name='phone'/>
        </View>),
    },
  },
  Logout:{
    screen:LogoutStackNavigator,
    navigationOptions:{
      title:'Log Out',
      drawerIcon: ({ tintColor}) => (
        <View>
          <Icon1 style={[{color:tintColor}]} size={20} name='logout'/>
        </View>),
    },
  },
},
{
  contentComponent:headerComponent
});

const AppSwitchNavigator = createSwitchNavigator({
  Splash:{screen:Splash},
  Welcome:{screen:WelcomeScreen},
  Dashboard1:{screen:AppDrawerNavigator},
  Signup:{screen:Signup},
  Login:{screen:Login},
  Dashboard:{screen:DashboardStackNavigator},
  Browse:{screen:Browse},
  tripHistory:{screen: tripHistory},
  ContactUs:{screen:ContactUs},
  Logout: {screen:Logout},
  Settings: {screen:Settings}
  
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
