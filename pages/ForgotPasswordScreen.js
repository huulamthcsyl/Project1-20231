import React, { useState } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput } from 'react-native'
import { DefaultStyle } from './style'
import CustomButton from './components/CustomButton'
import { sendPasswordResetEmail } from 'firebase/auth'
import { FIREBASE_AUTH } from '../firebaseConfig'
import { useToast } from 'react-native-toast-notifications'

export default function ForgotPasswordScreen() {

  const auth = FIREBASE_AUTH;
  const [email, setEmail] = useState();
  const toast = useToast();

  const handleSend = () => {
    //sendPasswordResetEmail(auth, email);
    toast.show("Email đã được gửi đi", { type: 'success', placement: 'bottom' });
  }

  return (
    <KeyboardAvoidingView>
        <View style={DefaultStyle.box}>
            <Text style={DefaultStyle.titleText}>Lấy lại mật khẩu</Text>
            <TextInput value={email} onChangeText={setEmail} style={DefaultStyle.input} placeholder='Email' />
            <Text style={{marginBottom: 20}}>Bạn sẽ nhận được email lấy lại mật khẩu</Text>
            <View style={{height: 60}}>
              <CustomButton title="Gửi" action={handleSend}/>
            </View>
        </View>
    </KeyboardAvoidingView>
  )
}