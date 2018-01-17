import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import pxToDp from '../../utils/pxToDp'
const BookMenu = (props)=> {
  const {menu} = props
  let menuList = menu.slice(0,6)
  return (
    <View style={styles.container}>
      {
        menuList.map((item,index)=> {
          return (
            <View key={index}> 
              <TouchableOpacity activeOpacity={0.6} >
                <Text numberOfLines={1} style={{color: '#333', fontSize: pxToDp(30), lineHeight: pxToDp(66)}}>{item.title}</Text>
              </TouchableOpacity>
              {
                item.children.map((child, i)=> (
                  <TouchableOpacity style={{paddingLeft: pxToDp(30)}} activeOpacity={0.6} key={i}>
                    <Text numberOfLines={1} style={{color: '#666', fontSize: pxToDp(30), lineHeight: pxToDp(66)}}>{child.title}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: pxToDp(100),
    paddingRight: pxToDp(70),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(30),
  }
})
export default BookMenu
