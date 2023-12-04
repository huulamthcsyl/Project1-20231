import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from './style'
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ParentClassCard from './components/ParentClassCard'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ParentProfileScreen from './ParentProfileScreen'
import { useFocusEffect } from '@react-navigation/native'

export default function ParentClassScreen({ navigation }) {

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [classes, setClasses] = useState([]);

  const Tab = createBottomTabNavigator();

  async function getClass() {
    const parentId = "JYx8ZOhoSAULVjpZM46zM763CNw2";
    const q = query(collection(db, "classes"), where("parentId", "==", parentId));
    const docSnap = await getDocs(q);
    let classList = [];
    docSnap.forEach((doc) => classList.push(doc.data()));
    setClasses(classList);
  }

  useEffect(() => {
    // const parentId = auth.currentUser.uid;
    getClass();
  }, [])

  useEffect(() => {
    const onLoad = navigation.addListener('focus', () => {
      getClass()
    });

    return onLoad;
  }, [navigation])
  

  return (
    <View style={{...DefaultStyle.container, paddingTop: 45}}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Danh sách lớp quản lý</Text>
      </View>
      {classes && 
        <FlatList style={{padding: 20, marginBottom: 5}} data={classes} renderItem={(data) => <ParentClassCard classData={data.item} />}/>
      } 
      <TouchableOpacity style={DefaultStyle.floatingButton} onPress={() => navigation.navigate("Create class")}>
        <Image style={DefaultStyle.floatingIcon} source={require('../assets/add.png')} />
      </TouchableOpacity>
    </View>
  )
}