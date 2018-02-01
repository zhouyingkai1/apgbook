import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

const Loading = (props) => (
  <View style={styles.container}>
    <ActivityIndicator color={props.color} size='large' animating={true}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Loading
