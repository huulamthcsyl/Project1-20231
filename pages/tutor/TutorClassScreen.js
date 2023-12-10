import { Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { DefaultStyle } from '../style'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import TutorClassCard from '../components/TutorClassCard'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RNPickerSelect from 'react-native-picker-select';
import CustomButton from '../components/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const RootStack = createNativeStackNavigator();

function HomeScreen({ navigation, route }) {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  // const [classes, setClasses] = useState([]);
  // let classes = route.params.classes;
  // let setClasses = route.params.setClasses;
  const { classes, setClasses } = useContext(ClassesContext);

  async function getClass() {
    const q = query(collection(db, "classes"), where("status", "==", false));
    const docSnap = await getDocs(q);
    let classList = [];
    docSnap.forEach((doc) => classList.push(doc.data()));
    setClasses(classList);
  }

  useEffect(() => {
    // const parentId = auth.currentUser.uid;
    getClass();
  }, [])

  return (
    <View style={{ ...DefaultStyle.container, paddingTop: 45 }}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Danh sách lớp học</Text>
      </View>
      {classes &&
        <FlatList style={{ padding: 20, marginBottom: 5 }} data={classes} renderItem={(data) => <TutorClassCard classData={data.item} handlePress={() => navigation.navigate("Class detail tutor", { classId: data.item.classId })} />} />
      }
      <TouchableOpacity style={DefaultStyle.floatingButton} onPress={() => navigation.navigate("Tutor class filter")}>
        <Image style={DefaultStyle.floatingIcon} source={require('../../assets/filter.png')} />
      </TouchableOpacity>
    </View>
  )
}

function FilterModal({ navigation }) {

  const subjectList = [
    {label: 'Toán', value: 'Toán'},
    {label: 'Văn', value: 'Văn'},
    {label: 'Vật lý', value: 'Vật lý'},
    {label: 'Hoá học', value: 'Hoá học'},
    {label: 'Tin học', value: 'Tin học'},
  ]
  const [subject, setSubject] = useState(null);
  const [startFee, setStartFee] = useState('0');
  const [endFee, setEndFee] = useState('10000000');
  const { setClasses } = useContext(ClassesContext);
  const db = FIREBASE_DB;
  const subjects = ['Toán', 'Văn', 'Vật lý', 'Hoá học', 'Tin học'];

  const handelFilter = async () => {
    const q = query(collection(db, "classes"), where("status", "==", false), where("subject", "in", subject ? [subject] : subjects), where("fee", ">=", parseInt(startFee)), where("fee", "<=", parseInt(endFee)));
    const docSnap = await getDocs(q);
    let classList = [];
    docSnap.forEach((doc) => classList.push(doc.data()));
    setClasses(classList);
    navigation.goBack();
  }

  return (
    <KeyboardAwareScrollView style={{position: 'absolute', bottom: 0, backgroundColor: 'white', height: '50%', width: '100%', padding: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
        <Text style={DefaultStyle.title}>Tìm kiếm</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{width: 30, height: 30}} source={require('../../assets/close.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
        <Text style={{ ...DefaultStyle.title, marginTop: 5, marginRight: 20 }}>Môn học</Text>
        <View style={{ borderWidth: 1, padding: 10, borderRadius: 5, width: 100 }}>
          <RNPickerSelect useNativeAndroidPickerStyle={false} placeholder={{ label: "Môn học" }} value={subject} onValueChange={(value) => setSubject(value)} items={subjectList} />
        </View>
      </View>
      <View>
        <Text style={{...DefaultStyle.title, marginBottom: 5}}>Học phí</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...DefaultStyle.text, marginTop: 10, marginRight: 10}}>từ</Text>
          <TextInput value={startFee} onChangeText={setStartFee} style={{...DefaultStyle.input, width: '50%', marginRight: 10}} keyboardType='numeric' />
          <Text style={{...DefaultStyle.text, marginTop: 10}}>đồng</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...DefaultStyle.text, marginTop: 10, marginRight: 10}}>đến</Text>
          <TextInput value={endFee} onChangeText={setEndFee} style={{...DefaultStyle.input, width: '50%', marginRight: 10}} keyboardType='numeric'/>
          <Text style={{...DefaultStyle.text, marginTop: 10}}>đồng</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handelFilter} style={{backgroundColor: '#4834D4', padding: 10, justifyContent: 'center', alignItems: 'center', width: '30%', borderRadius: 5}}>
        <Text style={{color: '#fff', fontSize: 20}}>Tìm kiếm</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  )
}

const ClassesContext = createContext(null);

export default function TutorClassScreen({ navigation }){
  const [classes, setClasses] = useState([]);
  return (
    <ClassesContext.Provider value={{classes, setClasses}}>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name='Tutor class home' component={HomeScreen} options={{headerShown: false}} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{presentation: 'containedTransparentModal'}}>
          <RootStack.Screen name='Tutor class filter' component={FilterModal} options={{headerShown: false}} />
        </RootStack.Group>
      </RootStack.Navigator>
    </ClassesContext.Provider>
  )
}