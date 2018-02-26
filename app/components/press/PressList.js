import React from 'react'
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import pxToDp from '../../utils/pxToDp'
const PressList = (props)=> {
  const {data} = props.press
  return (
    <View style={styles.itemBox}>
      {
        data.map((item, index)=> (
          <TouchableOpacity style={styles.item} key={index} 
            onPress={()=> props.navigation.navigate('PressDetail', {pressName: item.company_name, pressId: item.uid})}>
            <Image 
              source={item.logo?{uri: item.logo}: require('../../images/press_bg.jpg')}
              style={styles.logo}
            />
          </TouchableOpacity>
        ))
      }
    </View>
  )
}
const styles = StyleSheet.create({
  itemBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  item: {
    borderColor: '#c7c7c7',
    borderWidth: pxToDp(1),
    padding: pxToDp(10),
    width: pxToDp(332),
    height: pxToDp(166),
    marginBottom: pxToDp(20)
  },
  logo: {
    width: '100%',
    height: '100%'
  }
})
export default PressList