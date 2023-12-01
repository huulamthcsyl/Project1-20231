import { View, Text, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomButton from './components/CustomButton'
import { DefaultStyle } from './style'
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebaseConfig'

function LoginPage({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = FIREBASE_AUTH;

    const login = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView style={{height: "100%"}}>
                <View style={DefaultStyle.box}>
                    <Text style={DefaultStyle.titleText}>Đăng nhập</Text>
                    <TextInput style={DefaultStyle.input} placeholder='Email' value={email} onChangeText={setEmail}/>
                    <TextInput style={DefaultStyle.input} placeholder='Mật khẩu' value={password} onChangeText={setPassword} secureTextEntry={true}/>
                    <Text style={DefaultStyle.secondaryText} onPress={() => navigation.navigate("Forgot password")}>Quên mật khẩu</Text>
                    <CustomButton title="Đăng nhập" action={login} />
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{marginRight: 10, fontSize: 20}}>Chưa có tài khoản?</Text>
                        <Text style={DefaultStyle.linkText} onPress={() => navigation.navigate("Sign up")}>Đăng ký</Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default LoginPage