import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import pxToDp from '../../utils/pxToDp'

const TextButton = ({ text, textStyle, btnStyle }) => (
  <TouchableOpacity style={btnStyle}>
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  text: {
    fontSize: pxToDp(30),
    color: '#666',
    backgroundColor: 'rgba(0,0,0,0)'
  },
})

export default TextButton
