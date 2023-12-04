import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from './style'
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ParentClassCard from './components/ParentClassCard'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export default function ParentProfileScreen({ navigation }) {

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [classes, setClasses] = useState([]);

  const Tab = createBottomTabNavigator();

  async function getClass(q) {
    const docSnap = await getDocs(q);
    let classList = [];
    docSnap.forEach((doc) => classList.push(doc.data()));
    setClasses(classList);
  }

  useEffect(() => {
    // const parentId = auth.currentUser.uid;
    const parentId = "JYx8ZOhoSAULVjpZM46zM763CNw2";
    const q = query(collection(db, "classes"), where("parentId", "==", parentId));
    getClass(q);
  }, [])
  

  return (
    <View style={{...DefaultStyle.container, paddingTop: 45}}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Hồ sơ phụ huynh</Text>
      </View>
    </View>
  )
}