import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { DefaultStyle } from '../style'

function CustomButton({ title }) {
  return (
    <TouchableOpacity style={DefaultStyle.button}>
        <Text style={DefaultStyle.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton