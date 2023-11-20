import React from 'react'
import { KeyboardAvoidingView, View, Text, TextInput } from 'react-native'
import { DefaultStyle } from './style'
import CustomButton from './components/CustomButton'

function ForgotPasswordPage() {
  return (
    <KeyboardAvoidingView>
        <View style={DefaultStyle.box}>
            <Text style={DefaultStyle.titleText}>Lấy lại mật khẩu</Text>
            <TextInput style={DefaultStyle.input} placeholder='Email' />
            <Text style={{marginBottom: 20}}>Bạn sẽ nhận được email lấy lại mật khẩu</Text>
            <CustomButton title="Gửi" />
        </View>
    </KeyboardAvoidingView>
  )
}

export default ForgotPasswordPage