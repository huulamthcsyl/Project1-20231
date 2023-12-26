import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from './style'
import { FIREBASE_AUTH } from '../firebaseConfig'
import CustomButton from './components/CustomButton'

export default function AccountProfileScreen({ navigation }) {

  const auth = FIREBASE_AUTH;

  return (
    <SafeAreaView style={DefaultStyle.container} edges={['top']}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Thông tin tài khoản</Text>
      </View>
      <View style={{height: '100%', padding: 10}}>
        <Text style={DefaultStyle.title}>Email:</Text>
        <Text style={{fontSize: 20, marginBottom: 20}}>{auth.currentUser.email}</Text>
        <TouchableOpacity style={{padding: 10, backgroundColor: "#4834D4", borderRadius: 10, width: '50%', alignItems: 'center', alignSelf: 'center'}} onPress={() => navigation.navigate("Change password")}>
          <Text style={{fontSize: 24, color: "#fff", fontWeight: '500'}}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}