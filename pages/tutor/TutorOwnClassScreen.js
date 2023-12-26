import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from '../style'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { getDocs, where, query, collection } from 'firebase/firestore';
import TutorClassCard from '../components/TutorClassCard'

export default function TutorOwnClassScreen({ navigation }) {

  const [assignedList, setAssignedList] = useState([]);
  const db = FIREBASE_DB;
  const auth = FIREBASE_AUTH;

  function queryClass(type, setData){
    const q = query(collection(db, "classes"), where(type, "==", auth.currentUser.uid));
    let classList = [];
    getDocs(q)
    .then(res => {
      res.forEach((doc) => {
        let data = doc.data();
        classList.push(data);
      })
      setData(classList);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    queryClass("assignedTutor", setAssignedList);
  }, []);

  return (
    <SafeAreaView style={DefaultStyle.container} edges={['top']}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Lớp bản thân</Text>
      </View>
      <FlatList style={{ padding: 20, marginBottom: 5 }} data={assignedList} renderItem={(data) => <TutorClassCard classData={data.item} handlePress={() => navigation.navigate("Class detail tutor", { classId: data.item.classId })}/>} />
    </SafeAreaView>
  )
}