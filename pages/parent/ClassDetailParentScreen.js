import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultStyle } from '../style';
import { FIREBASE_DB } from '../../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

export default function ClassDetailParentScreen({ route, navigation }) {
  const { classId } = route.params;
  const [classData, setClassData] = useState(null);
  const db = FIREBASE_DB;

  async function getClassInfo(){
    try {
      const docSnap = await getDoc(doc(db, "classes", classId));
      setClassData(docSnap.data());
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getClassInfo();
  }, [])

  useEffect(() => {
    const onLoad = navigation.addListener('focus', () => {
      getClassInfo()
    });

    return onLoad;
  }, [navigation])

  return (
    <SafeAreaView style={DefaultStyle.container}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Thông tin lớp học</Text>
      </View>
      {classData ? 
        <View style={{padding: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{...DefaultStyle.classTitle, fontSize: 24, marginBottom: 10}}>{classData.classTitle}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Create class", {classData: classData})}>
              <Image style={{width: 25, height: 25}} source={require('../../assets/edit.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Text style={DefaultStyle.title}>Mã lớp: </Text>
            <Text style={{fontSize: 20, fontWeight: '400'}}>{classData.classId}</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Text style={DefaultStyle.title}>Môn học: </Text>
            <Text style={{fontSize: 20, fontWeight: '400'}}>{classData.subject}</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Text style={DefaultStyle.title}>Học phí: </Text>
            <Text style={{fontSize: 20, fontWeight: '400'}}>{classData.fee} đồng</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Text style={DefaultStyle.title}>Thời gian buổi học: </Text>
            <Text style={{fontSize: 20, fontWeight: '400'}}>{classData.duration} h</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Text style={DefaultStyle.title}>Trạng thái lớp: </Text>
            {
              classData.status ?
              <Text style={{fontSize: 20, fontWeight: '400', color: 'red'}}>Đã giao</Text> :
              <Text style={{fontSize: 20, fontWeight: '400', color: 'green'}}>Chưa giao</Text>
            }
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={DefaultStyle.title}>Địa điểm: </Text>
            <Text style={{fontSize: 20, fontWeight: '400'}}>{classData.location}</Text>
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={DefaultStyle.title}>Yêu cầu: </Text>
            <Text style={{fontSize: 20, fontWeight: '400'}}>{classData.requirement}</Text>
          </View>
          <View>
            <Text style={DefaultStyle.title}>Gia sư ứng tuyển: </Text>
          </View>
        </View> 
        : null
      }

    </SafeAreaView>
  )
}