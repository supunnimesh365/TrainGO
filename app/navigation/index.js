import React from  'react'
import { Image } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Welcome from './../screens/Welcome'
import Home from './../screens/Home'
import Booking from './../screens/Booking'
import Wallet from './../screens/Wallet'
import Login from './../screens/Login'
import Explorer from './../screens/Explorer'
import Browse from './../screens/Browse'
import Product from './../screens/Product'
import Settings from './../screens/Settings'

import { theme } from './../constants/'

const screens = createStackNavigator({
    Welcome,
    Login,
    Booking,
    Home,
    Wallet,
    Explorer,
    Browse,
    Product,
    Settings,
},{
    defaultNavigationOptions:{
        headerStyle:{},
        headerBackImage:<Image/>,
        headerBackTitle: null,
        headerLeftContainerStyle: {},
        headerRightContainerStyle: {}
    }
});

export default createAppContainer(screens);