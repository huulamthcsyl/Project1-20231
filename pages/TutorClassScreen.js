import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from './style'

export default function TutorClassScreen(){
  return (
    <SafeAreaView>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Danh sách lớp quản lý</Text>
      </View>
    </SafeAreaView>
  )
}