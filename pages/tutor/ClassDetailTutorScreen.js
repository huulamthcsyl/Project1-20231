import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultStyle } from '../style';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import CustomButton from '../components/CustomButton';

export default function ClassDetailTutorScreen({ route, navigation }) {
    const { classId } = route.params;
    const [classData, setClassData] = useState(null);
    const db = FIREBASE_DB;
    const auth = FIREBASE_AUTH;

    function ProfileInfoCard({ navigation, parentId }) {
      const [tutorInfo, setTutorInfo] = useState();
    
      useEffect(() => {
        getDoc(doc(db, "users", parentId))
        .then(res => setTutorInfo(res.data()))
        .catch(err => console.log(err));
      }, []);
    
    
      return (
        tutorInfo ? 
        <TouchableOpacity style={{borderWidth: 1, borderRadius: 5, flexDirection: 'row', padding: 10, display: 'flex', marginBottom: 10}} 
        onPress={() => navigation.navigate("Parent profile view", { parentId: parentId })}>
          <Image style={{marginRight: 20}} source={require('../../assets/profile.png')} />
          <Text style={DefaultStyle.text}>{tutorInfo.name}</Text>
          <View style={{flex: 1, marginRight: 10, flexDirection: 'row-reverse', gap: 10, paddingTop: 3}}>
            <Image source={require("../../assets/info.png")} />
          </View>
        </TouchableOpacity> 
        : null
      )
    }
  
    async function getClassInfo(){
      try {
        const docSnap = await getDoc(doc(db, "classes", classId));
        setClassData(docSnap.data());
      } catch (err) {
        console.log(err)
      }
    }

    const handleSubmit = () => {
        try{
            updateDoc(doc(db, "classes", classId), { tutorList: [...classData.tutorList, auth.currentUser.uid] });
        } catch (err) {
            console.log(err);
        }
        getClassInfo();
    }
  
    useEffect(() => {
      getClassInfo();
    }, [])
  
    return (
      <SafeAreaView style={DefaultStyle.container}>
        <View style={DefaultStyle.header}>
          <Text style={DefaultStyle.titleHeader}>Thông tin lớp học</Text>
        </View>
        {classData ? 
          <View style={{padding: 10}}>
            <Text style={{...DefaultStyle.classTitle, fontSize: 24, marginBottom: 10}}>{classData.classTitle}</Text>
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
            <View style={{marginBottom: 20}}>
              <Text style={DefaultStyle.title}>Địa điểm: </Text>
              <Text style={{fontSize: 20, fontWeight: '400'}}>{classData.location}</Text>
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={DefaultStyle.title}>Yêu cầu: </Text>
              <Text style={{fontSize: 20, fontWeight: '400'}}>{classData.requirement}</Text>
            </View>
            {
                classData.tutorList.includes(auth.currentUser.uid) ? 
                <View style={{height: 60}}>
                  <CustomButton title="Đã đăng ký" isDisable={true}/> 
                </View> : 
                classData.pendingList.includes(auth.currentUser.uid) ? 
                <View style={{height: 60}}>
                  <CustomButton title="Đang xét duyệt" isDisable={true} />
                </View> : 
                classData.rejectedList.includes(auth.currentUser.uid) ? 
                <View style={{height: 60}}>
                  <CustomButton title="Đã từ chối" isDisable={true} />
                </View> : 
                !classData.status ? 
                <View style={{height: 60}}>
                  <CustomButton title="Đăng ký nhận lớp" action={handleSubmit} />
                </View> :
                classData.assignedTutor == auth.currentUser.uid ?
                <View>
                  <Text style={DefaultStyle.title}>Thông tin phụ huynh: </Text>
                  <ProfileInfoCard navigation={navigation} parentId={classData.parentId} />
                </View> : null
            }
          </View> 
          : null
        }
  
      </SafeAreaView>
    )
}