import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from '../style'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { getDocs, where, query, collection } from 'firebase/firestore';
import TutorClassCard from '../components/TutorClassCard'

export default function TutorAssignedClassScreen() {

  const [classes, setClasses] = useState([]);
  const db = FIREBASE_DB;
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const q = query(collection(db, "classes"), where("assignedTutor", "==", auth.currentUser.uid));
    let classList = [];
    getDocs(q)
    .then(res => {
      res.forEach((doc) => classList.push(doc.data()));
      setClasses(classList);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <SafeAreaView style={DefaultStyle.container} edges={['top']}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Danh sách lớp đã nhận</Text>
      </View>
      {classes &&
        <FlatList style={{ padding: 20, marginBottom: 5 }} data={classes} renderItem={(data) => <TutorClassCard classData={data.item} />} />
      }
      <TouchableOpacity style={DefaultStyle.floatingButton} onPress={() => navigation.navigate("Tutor class filter")}>
        <Image style={DefaultStyle.floatingIcon} source={require('../../assets/filter.png')} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}