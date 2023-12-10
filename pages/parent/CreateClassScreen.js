import { View, Text, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from '../style'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from 'react-native-picker-select';
import CustomButton from '../components/CustomButton'
import { doc, setDoc } from 'firebase/firestore'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import { useToast } from 'react-native-toast-notifications'

export default function CreateClassScreen({ route, navigation }) {

  const [subject, setSubject] = useState(null);
  const [classTitle, setClassTitle] = useState();
  const [fee, setFee] = useState();
  const [location, setLocation] = useState();
  const [duration, setDuration] = useState();
  const [requirement, setRequirement] = useState();
  const [status, setStatus] = useState(false);
  const [classId, setClassId] = useState(null);
  const [parentId, setParentId] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const db = FIREBASE_DB;
  const auth = FIREBASE_AUTH;
  const toast = useToast();

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const subjectList = [
    {label: 'Toán', value: 'Toán'},
    {label: 'Văn', value: 'Văn'},
    {label: 'Vật lý', value: 'Vật lý'},
    {label: 'Hoá học', value: 'Hoá học'},
    {label: 'Tin học', value: 'Tin học'},
  ]

  const handleSubmit = () => {
    const newClass = {
      classId: classId,
      classTitle: classTitle,
      subject: subject,
      fee: parseInt(fee),
      duration: parseFloat(duration),
      location: location,
      requirement: requirement,
      parentId: parentId,
      status: status,
      tutorList: [],
      assignedTutor: null
    }
    try{
      setDoc(doc(db, "classes", classId), newClass);
      toast.show(isEditing ? "Chỉnh sửa lớp học thành công" : "Tạo lớp học mới thành công", { type: 'success', placement: 'bottom' });
      navigation.goBack()
    } catch (err) {
      alert("Nhập các thông tin còn thiếu");
      console.log(err);
    }
  }

  useEffect(() => {
    let classData = null;
    if(route.params) classData = route.params['classData'];
    if(classData){
      setClassTitle(classData.classTitle);
      setDuration(classData.duration);
      setFee(classData.fee);
      setLocation(classData.location);
      setRequirement(classData.requirement);
      setSubject(classData.subject);
      setStatus(classData.status);
      setClassId(classData.classId);
      setIsEditing(true);
    } else setClassId(makeid(6));
    setParentId(auth.currentUser.uid);
  }, [])

  return (
    <SafeAreaView style={DefaultStyle.container}> 
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>{isEditing ? "Chỉnh sửa lớp học" : "Tạo lớp học mới"}</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={{ height: "100%", padding: 10 }}>
          <View>
            <Text style={{...DefaultStyle.title, marginBottom: 10}}>Tiêu đề</Text>
            <TextInput style={DefaultStyle.input} value={classTitle} onChangeText={setClassTitle}/>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20}}>
            <Text style={{...DefaultStyle.title, marginTop: 5, marginRight: 20}}>Môn học</Text>
            <View style={{borderWidth: 1, padding: 10, borderRadius: 5, width: 100}}>
              <RNPickerSelect useNativeAndroidPickerStyle={false} placeholder={{label: "Môn học"}} value={subject} onValueChange={(value) => setSubject(value)} items={subjectList} />
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20}}>
            <Text style={{...DefaultStyle.title, marginTop: 10, marginRight: 20}}>Học phí</Text>
            <TextInput style={{...DefaultStyle.input, width: 150, marginRight: 20, marginBottom: 0}} value={fee} onChangeText={setFee} keyboardType='numeric'/>
            <Text style={{...DefaultStyle.title, marginTop: 10, marginRight: 20}}>đồng</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20}}>
            <Text style={{...DefaultStyle.title, marginTop: 10, marginRight: 20}}>Thời gian buổi học</Text>
            <TextInput style={{...DefaultStyle.input, width: 50, marginRight: 20, marginBottom: 0}} value={duration} onChangeText={setDuration} keyboardType='numeric'/>
            <Text style={{...DefaultStyle.title, marginTop: 10, marginRight: 20}}>giờ</Text>
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={{...DefaultStyle.title, marginBottom: 10}}>Địa điểm</Text>
            <TextInput style={{...DefaultStyle.input, marginBottom: 0, height: 100}} value={location} onChangeText={setLocation} multiline blurOnSubmit/>
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={{...DefaultStyle.title, marginBottom: 10}}>Yêu cầu</Text>
            <TextInput style={{...DefaultStyle.input, marginBottom: 0, height: 100}} value={requirement} onChangeText={setRequirement} multiline blurOnSubmit/>
          </View>
          <CustomButton title="Xác nhận" action={handleSubmit}/>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}