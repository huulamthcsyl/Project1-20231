import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { DefaultStyle } from '../style'

function CustomButton({ title, action, isDisable = false }) {
  return (
    <TouchableOpacity style={DefaultStyle.button} onPress={action} disabled={isDisable}>
      <Text style={DefaultStyle.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton