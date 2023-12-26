import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from '../style'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { getDocs, where, query, collection } from 'firebase/firestore';
import TutorClassCard from '../components/TutorClassCard'

export default function TutorAssignedClassScreen({ navigation }) {

  const [availableList, setAvailableList] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [rejectedList, setRejectedList] = useState([]);
  const [assignedList, setAssignedList] = useState([]);
  const db = FIREBASE_DB;
  const auth = FIREBASE_AUTH;

  function queryClass(type, setData){
    let q;
    if(type == "assignedTutor"){
      q = query(collection(db, "classes"), where(type, "==", auth.currentUser.uid));
    } else {
      q = query(collection(db, "classes"), where(type, "array-contains", auth.currentUser.uid));
    }
    let classList = [];
    getDocs(q)
    .then(res => {
      res.forEach((doc) => {
        let data = doc.data();
        if(type == "tutorList"){
          data.type = "Đã đăng ký";
          data.color = "green";
        } else if(type == "assignedTutor") {
          data.type = "Đã nhận";
          data.color = "#4834D4";
        } else if(type == "pendingList") {
          data.type = "Đang xét duyệt";
          data.color = "blue";
        } else if(type == "rejectedList") {
          data.type = "Đã từ chối";
          data.color = "red";
        }
        classList.push(data);
      })
      setData(classList);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    queryClass("assignedTutor", setAssignedList);
    queryClass("tutorList", setAvailableList);
    queryClass("pendingList", setPendingList);
    queryClass("rejectedList", setRejectedList);
  }, []);

  return (
    <SafeAreaView style={DefaultStyle.container} edges={['top']}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Lớp đã đăng ký</Text>
      </View>
      <FlatList style={{ padding: 20, marginBottom: 5 }} data={[...availableList, ...pendingList, ...rejectedList, ...assignedList]} renderItem={(data) => <TutorClassCard classData={data.item} handlePress={() => navigation.navigate("Class detail tutor", { classId: data.item.classId })}/>} />
    </SafeAreaView>
  )
}