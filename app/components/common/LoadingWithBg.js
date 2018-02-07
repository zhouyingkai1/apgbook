import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import pxToDp from '../../utils/pxToDp'
import Loading from './Loading'
const LoadingWithBg = ({isShow}) => (
  isShow?
    <View style={styles.loading}>
      <Loading color={'#fff'} />
    </View>: null
)
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    left: '50%',
    top: '50%',
    marginLeft: -pxToDp(100),
    marginTop: -pxToDp(100),
    zIndex: 55,
    width: pxToDp(200),
    height: pxToDp(200),
    backgroundColor: 'rgba(0,0,0,.8)',
    borderRadius: 10
  }
})
export default LoadingWithBg