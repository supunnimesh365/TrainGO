import React from 'react'
//import { Image } from 'react-native'
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from './../screens/Home'
import Booking from './../screens/Booking'
import Wallet from './../screens/Wallet'
import Login from './../screens/Login'
import Explorer from './../screens/Explorer'
import Browse from './../screens/Browse'
import Product from './../screens/Product'
import Settings from './../screens/Settings'

import { theme } from './../constants/'

const screens = createBottomTabNavigator(
    {
        Home: Home,
        Wallet: Wallet,
        Booking: Booking
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'Home') {
                    return (
                        <Icon name="rocket" size={30} color="#900" />
                    );
                }
                else if(routeName === 'Wallet'){
                    return (
                        <Icon name="rocket" size={30} color="#900" />
                    );
                }
                else {
                    return (
                        <Icon name="rocket" size={30} color="#900" />
                    );
                }
            },
        }),
        tabBarOptions: {
            activeTintColor: '#FF6F00',
            inactiveTintColor: '#263238',
          },
    }
)

export default createAppContainer(screens);