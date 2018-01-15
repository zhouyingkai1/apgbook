import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Modal from "react-native-modal"
import pxToDp from '../../utils/pxToDp'
import {BlurView} from 'react-native-blur'
const Alert = (props)=> {
  const { txt, visible, onBackdropPress, cancleTxt, okTxt, onOkPress, onCanclePress } = props
  return (
    <Modal isVisible={visible} 
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      style={{height: pxToDp(200), alignItems: 'center',}}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.2}
    >
      <View style={styles.model}>
        <BlurView style={styles.absolute}
          blurType="light"
          blurAmount={10}/>
        <View style={styles.main}>
            <Text style={{color: '#000', fontSize: pxToDp(35), lineHeight: pxToDp(46)}}>{txt}</Text>
          </View>
          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.button} onPress={onCanclePress || onBackdropPress}>
              <Text style={styles.txt}>{cancleTxt || '取消'}</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TouchableOpacity style={styles.button} onPress={onOkPress || onBackdropPress}>
              <Text style={styles.txt}>{okTxt || '确定'}</Text>
            </TouchableOpacity>
          </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  model: { 
    width: pxToDp(540), 
    borderRadius: 14, 
    backgroundColor: 'rgba(255,255,255,.86)',
    overflow: 'hidden'
  },
  main: {
    paddingLeft: pxToDp(45), 
    paddingTop: pxToDp(45), 
    paddingRight: pxToDp(45), 
    paddingBottom: pxToDp(45), 
    borderBottomColor: '#c6c5c3',
    borderBottomWidth: 1,
  },
  buttonBox: {
    flexDirection: 'row'
  },
  txt: {
    color: '#1875c5',
    fontSize: pxToDp(38),
  },
  button: {
    flex: 1,
    alignItems: 'center',
    height: pxToDp(90),
    justifyContent: 'center'
  },
  line: {
    backgroundColor: '#c6c5c3',
    width: 1,
    height: pxToDp(90)
  },
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
})
export default Alert      