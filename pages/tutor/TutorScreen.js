import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TutorClassScreen from './TutorClassScreen';
import TutorProfileScreen from './TutorProfileScreen';

const Tab = createBottomTabNavigator();

export default function TutorScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name='Tutor class' 
        component={TutorClassScreen} 
        options={{ headerShown: false, title: "Lớp học", tabBarLabelStyle: {fontSize: 12}, tabBarIcon: ({ focused, horizontal, tintColor }) => <Image source={require('../../assets/class.png')} />}}
      />
      <Tab.Screen 
        name='Tutor profile' 
        component={TutorProfileScreen} 
        options={{ headerShown: false, title: "Hồ sơ", tabBarLabelStyle: {fontSize: 12}, tabBarIcon: ({ focused, horizontal, tintColor }) => <Image source={require('../../assets/profile.png')} />}}
      />
    </Tab.Navigator>
  )
}