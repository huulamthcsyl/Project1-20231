import React, { useMemo, useState } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, ScrollView } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';
import { DefaultStyle } from './style'
import CustomButton from './components/CustomButton'

function SignUpPage({ navigation }) {

    const roleOptions = useMemo(() => [
        {
            id: '1',
            label: 'Phụ huynh',
            value: 1,
            labelStyle: {
                fontSize: 20
            }
        },
        {
            id: '2',
            label: 'Gia sư',
            value: 2,
            labelStyle: {
                fontSize: 20
            }
        }
    ])

    const [role, setRole] = useState();

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={DefaultStyle.container}>
            <ScrollView style={DefaultStyle.box}>
                <Text style={DefaultStyle.titleText}>Đăng ký</Text>
                <TextInput style={DefaultStyle.input} placeholder='Email'/>
                <TextInput style={DefaultStyle.input} placeholder='Mật khẩu' secureTextEntry={true}/>
                <TextInput style={DefaultStyle.input} placeholder='Xác nhận mật khẩu' secureTextEntry={true}/>
                <View style={{flexDirection: 'row', marginBottom: 30}}>
                    <Text style={[DefaultStyle.text, {marginTop: 4}]}>Bạn là: </Text>
                    <RadioGroup layout='row' radioButtons={roleOptions} onPress={setRole} selectedId={role}/>
                </View>
                <CustomButton title="Đăng ký" />
                <View style={{flexDirection: 'row', justifyContent: "center"}}>
                    <Text style={{marginRight: 10, fontSize: 20}}>Đã có tài khoản?</Text>
                    <Text style={DefaultStyle.linkText} onPress={() => navigation.goBack()}>Đăng nhập</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export default SignUpPage