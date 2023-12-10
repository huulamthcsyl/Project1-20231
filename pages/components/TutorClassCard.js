import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DefaultStyle } from '../style'

export default function ParentClassCard({classData, handlePress}) {
  return (
    <TouchableOpacity style={DefaultStyle.card} onPress={handlePress}>
      <Text style={{...DefaultStyle.classTitle, fontSize: 24, marginBottom: 10}}>{classData.classTitle}</Text>
      <View style={{flexDirection: 'row'}}>
        <Image style={{marginRight: 10}} source={require('../../assets/classId.png')} />
        <Text style={{...DefaultStyle.secondaryText, margin: 0, fontSize: 18, marginTop: 5}}>Mã lớp: {classData.classId}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image style={{marginRight: 10}} source={require('../../assets/subject.png')} />
        <Text style={{...DefaultStyle.secondaryText, margin: 0, fontSize: 18}}>{classData.subject}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image style={{marginRight: 10}} source={require('../../assets/fee.png')} />
        <Text style={{...DefaultStyle.secondaryText, margin: 0, fontSize: 18}}>{classData.fee} đồng / {classData.duration} h</Text>
      </View>
      <View style={{flexDirection: 'row', paddingRight: 40}}>
        <Image style={{marginRight: 10}} source={require('../../assets/address.png')} />
        <Text style={{...DefaultStyle.secondaryText, margin: 0, fontSize: 18}}>{classData.location}</Text>
      </View>
    </TouchableOpacity>
  )
}