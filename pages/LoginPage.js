import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomButton from './components/CustomButton'
import { DefaultStyle } from './style'

function LoginPage({ navigation }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={DefaultStyle.container}>
        <ScrollView style={DefaultStyle.box}>
            <Text style={DefaultStyle.titleText}>Đăng nhập</Text>
            <TextInput style={DefaultStyle.input} placeholder='Email'/>
            <TextInput style={DefaultStyle.input} placeholder='Mật khẩu' secureTextEntry={true}/>
            <Text style={DefaultStyle.secondaryText} onPress={() => navigation.navigate("Forgot password")}>Quên mật khẩu</Text>
            <CustomButton title="Đăng nhập" />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{marginRight: 10, fontSize: 20}}>Chưa có tài khoản?</Text>
                <Text style={DefaultStyle.linkText} onPress={() => navigation.navigate("Sign up")}>Đăng ký</Text>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginPage