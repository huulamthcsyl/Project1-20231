import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ParentClassScreen from './ParentClassScreen';
import ParentProfileScreen from './ParentProfileScreen';

const Tab = createBottomTabNavigator()

export default function ParentScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name='Parent class' 
        component={ParentClassScreen} 
        options={{ headerShown: false, title: "Lớp học", tabBarLabelStyle: {fontSize: 12}, tabBarIcon: ({ focused, horizontal, tintColor }) => <Image source={require('../assets/class.png')} />}}
      />
      <Tab.Screen 
        name='Parent profile' 
        component={ParentProfileScreen} 
        options={{ headerShown: false, title: "Hồ sơ", tabBarLabelStyle: {fontSize: 12}, tabBarIcon: ({ focused, horizontal, tintColor }) => <Image source={require('../assets/profile.png')} />}}
      />
    </Tab.Navigator>
  )
}