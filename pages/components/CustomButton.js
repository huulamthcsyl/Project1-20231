import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { DefaultStyle } from '../style'

function CustomButton({ title, action }) {
  return (
    <TouchableOpacity style={DefaultStyle.button} onPress={action}>
        <Text style={DefaultStyle.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton