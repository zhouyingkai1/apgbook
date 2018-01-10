import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

const Detail = (props)=> {
  return (
    <View >
      <Text>Detail</Text>
    </View>
  )
}

const mapStateToProps = ({app})=> {
  return {app}
}
export default connect(mapStateToProps)(Detail)
