import React, { useMemo, useState } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, ScrollView } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';
import { DefaultStyle } from './style'
import CustomButton from './components/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from 'react-native-toast-notifications';

export default function SignUpScreen({ navigation }) {

  const roleOptions = useMemo(() => [
    {
      id: '0',
      label: 'Phụ huynh',
      value: 0,
      labelStyle: {
        fontSize: 20
      }
    },
    {
      id: '1',
      label: 'Gia sư',
      value: 1,
      labelStyle: {
        fontSize: 20
      }
    }
  ])

  const [role, setRole] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const toast = useToast();

  const signUp = async () => {
    // const response = await createUserWithEmailAndPassword(auth, email, password);
    setErrorMessage(null);
    if (email.length == 0) {
      setErrorMessage("Vui lòng nhập email")
      return;
    }
    if (password.length == 0) {
      setErrorMessage("Vui lòng nhập mật khẩu")
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Mật khẩu cần gồm ít nhất 6 ký tự")
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Xác nhận mật khẩu không khớp");
      return;
    }
    if (role == null) {
      setErrorMessage("Vui lòng chọn vai trò");
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      setDoc(doc(db, "users", response.user.uid), { role: roleOptions[role].label })
      toast.show("Tạo tài khoản mới thành công", { type: 'success', placement: 'bottom' });
      navigation.goBack()
    } catch (err) {
      console.log(err)
      if (err.code == 'auth/invalid-email') {
        setErrorMessage("Email không hợp lệ");
        return;
      }
      if (err.code == 'auth/email-already-exists') {
        setErrorMessage("Email đã tồn tại");
        return;
      }
      if (err.code == 'auth/email-already-in-use') {
        setErrorMessage("Email đã được sử dụng");
        return;
      }
    }

  }

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView style={{ height: "100%" }}>
        <View style={DefaultStyle.box}>
          <Text style={DefaultStyle.titleText}>Đăng ký</Text>
          <TextInput style={DefaultStyle.input} placeholder='Email' value={email} onChangeText={setEmail} keyboardType='email-address' />
          <TextInput style={DefaultStyle.input} placeholder='Mật khẩu' secureTextEntry={true} value={password} onChangeText={setPassword} />
          <TextInput style={DefaultStyle.input} placeholder='Xác nhận mật khẩu' secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Text style={[DefaultStyle.text, { marginTop: 4 }]}>Bạn là: </Text>
            <RadioGroup layout='row' radioButtons={roleOptions} onPress={setRole} selectedId={role} />
          </View>
          {errorMessage && <Text style={DefaultStyle.errorText}>{errorMessage}</Text>}
          <CustomButton title="Đăng ký" action={signUp} />
          <View style={{ flexDirection: 'row', justifyContent: "center" }}>
            <Text style={{ marginRight: 10, fontSize: 20 }}>Đã có tài khoản?</Text>
            <Text style={DefaultStyle.linkText} onPress={() => navigation.goBack()}>Đăng nhập</Text>
          </View>
        </View>
      </KeyboardAwareScrollView >
    </SafeAreaView>
  )
}
