import { Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from '../style'
import CustomButton from '../components/CustomButton'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { signOut } from 'firebase/auth'

export default function ParentProfileScreen({ navigation }) {

  const auth = FIREBASE_AUTH;
  const handleLogout = () => {
    signOut(auth);
    navigation.popToTop();
  }

  return (
    <View style={{...DefaultStyle.container, paddingTop: 45}}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Hồ sơ phụ huynh</Text>
      </View>
      <View style={{alignItems: "center"}}>
        <TouchableOpacity style={{...DefaultStyle.profileButton, flexDirection: 'row', padding: 10, marginTop: 40}}>
          <Image style={{marginRight: 10}} source={require('../../assets/profile.png')}/>
          <Text style={DefaultStyle.title}>Thông tin tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...DefaultStyle.profileButton, flexDirection: 'row', padding: 10, marginTop: 40}}>
          <Image style={{marginRight: 10}} source={require('../../assets/class.png')}/>
          <Text style={DefaultStyle.title}>Hồ sơ phụ huynh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...DefaultStyle.profileButton, flexDirection: 'row', padding: 10, marginVertical: 40}}>
          <Image style={{marginRight: 10}} source={require('../../assets/subject.png')}/>
          <Text style={DefaultStyle.title}>Lớp đã nhận</Text>
        </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', bottom: 40, alignSelf: 'center', width: '80%'}}>
        <CustomButton action={handleLogout} title="Đăng xuất" />
      </View>
    </View>
  )
}