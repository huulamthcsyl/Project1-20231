import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultStyle } from '../style';
import { FIREBASE_DB } from '../../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

const db = FIREBASE_DB;

function ProfileInfoCard({ navigation, tutorId, classId }) {
  const [tutorInfo, setTutorInfo] = useState();

  useEffect(() => {
    getDoc(doc(db, "users", tutorId))
    .then(res => setTutorInfo(res.data()))
    .catch(err => console.log(err));
  }, []);


  return (
    tutorInfo ? 
    <TouchableOpacity style={{borderWidth: 1, borderRadius: 5, flexDirection: 'row', padding: 10, display: 'flex', marginBottom: 10}} 
    onPress={() => navigation.navigate("Tutor profile view", { tutorId: tutorId, classId: classId })}>
      <Image style={{marginRight: 20}} source={require('../../assets/profile.png')} />
      <Text style={DefaultStyle.text}>{tutorInfo.name}</Text>
      <View style={{flex: 1, marginRight: 10, flexDirection: 'row-reverse', gap: 10, paddingTop: 3}}>
        <Image source={require("../../assets/info.png")} />
      </View>
    </TouchableOpacity> 
    : null
  )
}

export default function ClassDetailParentScreen({ route, navigation }) {
  const { classId } = route.params;
  const [classData, setClassData] = useState(null);

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
          { classData.status ? 
            <View>
              <Text style={DefaultStyle.title}>Gia sư: </Text>
              <ProfileInfoCard tutorId={classData.assignedTutor} navigation={navigation} classId={classId}/>
            </View> : 
            <View>
              <Text style={DefaultStyle.title}>Gia sư ứng tuyển: </Text>
              <FlatList data={classData.tutorList} renderItem={(data) => <ProfileInfoCard tutorId={data.item} navigation={navigation} classId={classId}/>}/>
            </View>
          }
        </View> 
        : null
      }
    </SafeAreaView>
  )
}