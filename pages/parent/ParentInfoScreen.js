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

export default function ParentInfoScreen() {

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const toast = useToast();

  const roleOptions = useMemo(() => [
    {
      id: '0',
      label: 'Nam',
      value: 0,
      labelStyle: {
        fontSize: 18
      }
    },
    {
      id: '1',
      label: 'Nữ',
      value: 1,
      labelStyle: {
        fontSize: 18
      }
    }
  ])

  const onChange = ({ type }, selectedDate) => {
    setShowDatePicker(!showDatePicker);
    if(type == "set"){
      setDate(selectedDate);
      setDateOfBirth(selectedDate.toLocaleDateString());
    } 
  }

  useEffect(() => {
    const uid = auth.currentUser.uid;
    getDoc(doc(db, "users", uid))
    .then(res => {
      const data = res.data();
      setName(data.name ? data.name : "");
      setAddress(data.address ? data.address : "");
      setGender(data.gender ? data.gender : "");
      setPhoneNumber(data.phoneNumber ? data.phoneNumber : "");
      setDateOfBirth(data.dateOfBirth ? data.dateOfBirth : "");
      if(data.dateOfBirth) setDate(new Date(data.dateOfBirth))
    })
    .catch(err => console.log(err));
  }, [])
  
  
  const onSubmit = () => {
    const info = {
      role: "Phụ huynh",
      name: name,
      dateOfBirth: dateOfBirth,
      gender: gender,
      address: address,
      phoneNumber: phoneNumber,
    }
    const uid = auth.currentUser.uid;
    setDoc(doc(db, "users", uid), info)
    .then(res => {
      toast.show("Cập nhật thông tin thành công", { type: 'success', placement: 'bottom' })
    })
    .catch(err => console.log(err))
  }

  return (
    <SafeAreaView style={DefaultStyle.container}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Thông tin phụ huynh</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={{ height: "100%", padding: 10 }}>
          <View>
            <Text style={{...DefaultStyle.title, marginBottom: 10}}>Họ và tên</Text>
            <TextInput style={DefaultStyle.input} value={name} onChangeText={setName}/>
          </View>
          <View>
            <Text style={{...DefaultStyle.title, marginBottom: 10}}>Ngày, tháng, năm sinh</Text>
            {showDatePicker && <DateTimePicker display='spinner' mode='date' value={date} onChange={onChange}/>}
            <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
              <TextInput style={DefaultStyle.input} editable={false} value={dateOfBirth} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Text style={{...DefaultStyle.title, marginBottom: 10, marginTop: 8}}>Giới tính: </Text>
            <RadioGroup layout='row' radioButtons={roleOptions} onPress={setGender} selectedId={gender} />
          </View>
          <View>
            <Text style={{...DefaultStyle.title, marginBottom: 10}}>Địa chỉ</Text>
            <TextInput style={DefaultStyle.input} value={address} onChangeText={setAddress}/>
          </View>
          <View>
            <Text style={{...DefaultStyle.title, marginBottom: 10}}>Số điện thoại</Text>
            <TextInput style={DefaultStyle.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType='numeric'/>
          </View>
          <CustomButton title="Xác nhận" action={onSubmit}/>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}