import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export class ParentClassPage extends Component {
  render() {
    return (
      <SafeAreaView>
        <Text>ParentClassPage</Text>
      </SafeAreaView>
    )
  }
}

export default ParentClassPage