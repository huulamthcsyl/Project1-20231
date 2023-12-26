import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from '../style'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker'
import { RadioGroup } from 'react-native-radio-buttons-group'
import CustomButton from '../components/CustomButton'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { useToast } from 'react-native-toast-notifications'

export default function ParentProfileViewScreen({ navigation, route }) {

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [parentInfo, setParentInfo] = useState();
  const { parentId } = route.params; 

  useEffect(() => {
    getDoc(doc(db, "users", parentId))
      .then(res => {
        setParentInfo(res.data())
      })
      .catch(err => console.log(err));
  }, [])


  return (
    <SafeAreaView style={DefaultStyle.container}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Thông tin phụ huynh</Text>
      </View>
      {parentInfo &&
        <KeyboardAwareScrollView>
          <View style={{ height: "100%", padding: 10 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ ...DefaultStyle.title, marginBottom: 10, marginRight: 10 }}>Họ và tên</Text>
              <Text style={DefaultStyle.text}>{parentInfo.name}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ ...DefaultStyle.title, marginBottom: 10, marginRight: 10 }}>Ngày, tháng, năm sinh</Text>
              <Text style={DefaultStyle.text}>{parentInfo.dateOfBirth}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ ...DefaultStyle.title, marginBottom: 10, marginRight: 10 }}>Giới tính: </Text>
              <Text style={DefaultStyle.text}>{parentInfo.gender == "0" ? "Nam" : "Nữ"}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ ...DefaultStyle.title, marginBottom: 10, marginRight: 10 }}>Địa chỉ</Text>
              <Text style={DefaultStyle.text}>{parentInfo.address}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ ...DefaultStyle.title, marginBottom: 10, marginRight: 10 }}>Số điện thoại</Text>
              <Text style={DefaultStyle.text}>{parentInfo.phoneNumber}</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      }
    </SafeAreaView>
  )
}