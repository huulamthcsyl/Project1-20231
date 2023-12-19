import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from '../style'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker'
import { RadioGroup } from 'react-native-radio-buttons-group'
import CustomButton from '../components/CustomButton'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useToast } from 'react-native-toast-notifications'

export default function TutorProfileViewScreen({ navigation, route }) {

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [tutorInfo, setTutorInfo] = useState();
  const [classInfo, setClassInfo] = useState();
  const { tutorId, classId } = route.params; 
  const toast = useToast();

  const handleSubmit = () => {
    Alert.alert("Xác nhận", `Bạn có chắn chắn muốn nhận gia sư ${tutorInfo.name} không?`, 
    [
      {
        text: "Xác nhận",
        onPress: () => {
          updateDoc(doc(db, "classes", classId), {assignedTutor: tutorId, tutorList: [], status: true})
          .then(res => {
            toast.show("Giao lớp thành công!", { type: 'success', placement: 'bottom' });
            navigation.goBack();
          })
          .catch(err => console.log(err));
        }
      },
      {
        text: "Huỷ bỏ",
        onPress: () => {
          
        }
      }
    ]);
  }

  useEffect(() => {
    getDoc(doc(db, "users", tutorId))
    .then(res => {
      setTutorInfo(res.data());
    })
    .catch(err => console.log(err));
    getDoc(doc(db, "classes", classId))
    .then(res => {
      setClassInfo(res.data());
    })
    .catch(err => console.log(err));
  }, [])

  return (
    <SafeAreaView style={DefaultStyle.container}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Thông tin gia sư</Text>
      </View>
      {tutorInfo ?
      <KeyboardAwareScrollView>
        <View style={{ height: "100%", padding: 10 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{...DefaultStyle.title, marginBottom: 10 , marginRight: 10}}>Họ và tên</Text>
            <Text style={DefaultStyle.text}>{tutorInfo.name}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{...DefaultStyle.title, marginBottom: 10 , marginRight: 10}}>Ngày, tháng, năm sinh</Text>
            <Text style={DefaultStyle.text}>{tutorInfo.dateOfBirth}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{...DefaultStyle.title, marginBottom: 10, marginRight: 10}}>Giới tính: </Text>
            <Text style={DefaultStyle.text}>{tutorInfo.gender == "0" ? "Nam" : "Nữ"}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{...DefaultStyle.title, marginBottom: 10, marginRight: 10}}>Địa chỉ</Text>
            <Text style={DefaultStyle.text}>{tutorInfo.address}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{...DefaultStyle.title, marginBottom: 10, marginRight: 10}}>Số điện thoại</Text>
            <Text style={DefaultStyle.text}>{tutorInfo.phoneNumber}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{...DefaultStyle.title, marginBottom: 10, marginRight: 10}}>Nơi học (công tác)</Text>
            <Text style={DefaultStyle.text}>{tutorInfo.workAddress}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{...DefaultStyle.title, marginBottom: 10, marginRight: 10}}>Giới thiệu bản thân</Text>
            <Text style={DefaultStyle.text}>{tutorInfo.description}</Text>
          </View>
          {classInfo && !classInfo.status && <CustomButton title="Nhận gia sư" action={handleSubmit}/>}
        </View>
      </KeyboardAwareScrollView>
      : null
      }
    </SafeAreaView>
  )
}