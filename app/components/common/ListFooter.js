import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import pxToDp from '../../utils/pxToDp'
import theme from '../../utils/theme'
import Loading from './Loading'
const ListFooter = ({page, total}) => {
  return (
    <View style={styles.footer}>
      {
        page >= total ? 
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.noMoreLine}></View>
          <Text style={styles.full}>没有更多了～</Text>
        </View>
        : <Loading />
      }
    </View>
  )
}
const styles = StyleSheet.create({
  footer: { 
    marginTop: pxToDp(20), 
    marginBottom: pxToDp(30), 
    justifyContent: 'center', 
    paddingLeft: pxToDp(40), 
    paddingRight: pxToDp(40)
  },
  full: {
    textAlign: 'center',   
    color: '#666',
    position: 'absolute',
    top: 0,
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
  },
  noMoreLine: {
    height: 1,
    marginTop: pxToDp(16),
    width: (theme.screenWidth - 30),
    backgroundColor: '#c7c7c7'
  },
})
export default ListFooter