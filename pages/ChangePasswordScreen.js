import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultStyle } from './style'
import CustomButton from './components/CustomButton';
import { updatePassword } from 'firebase/auth';
import { useToast } from 'react-native-toast-notifications';
import { FIREBASE_AUTH } from '../firebaseConfig';

export default function ChangePasswordScreen({ navigation }) {

  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState(null);
  const auth = FIREBASE_AUTH;

  const toast = useToast();

  const handleChangePassword = () => {
    setError(null);
    if(newPassword !== confirmPassword){
      setError("Xác nhận mật khẩu không khớp");
      return;
    }
    updatePassword(auth.currentUser, newPassword)
    .then(res => {
      toast.show("Đổi mật khẩu thành công", { type: 'success' });
      navigation.goBack();
    })
    .catch(err => {
      if(err.code == "auth/weak-password"){
        setError("Mật khẩu cần ít nhất 6 ký tự");
        return;
      }
      console.log(err.code)
    });
  }

  return (
    <SafeAreaView style={DefaultStyle.container}>
      <View style={DefaultStyle.header}>
        <Text style={DefaultStyle.titleHeader}>Đổi mật khẩu</Text>
      </View>
      <View style={{padding: 20}}>
        <TextInput style={{...DefaultStyle.input, marginBottom: 20}} value={newPassword} onChangeText={setNewPassword} secureTextEntry placeholder='Mật khẩu mới'/>
        <TextInput style={{...DefaultStyle.input, marginBottom: 20}} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry placeholder='Xác nhận mật khẩu mới'/>
        {error && <Text style={{fontSize: 20, color: 'red', marginBottom: 20}}>{error}</Text>}
        <TouchableOpacity style={{padding: 10, backgroundColor: "#4834D4", borderRadius: 10, width: '50%', alignItems: 'center', alignSelf: 'center'}} onPress={handleChangePassword}>
          <Text style={{fontSize: 24, color: "#fff", fontWeight: '500'}}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}