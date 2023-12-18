import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { DefaultStyle } from '../style'

function CustomButton({ title, action, isDisable = false, color = '#4834D4' }) {
  return (
    <TouchableOpacity style={{...DefaultStyle.button, backgroundColor: color}} onPress={action} disabled={isDisable}>
      <Text style={DefaultStyle.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton