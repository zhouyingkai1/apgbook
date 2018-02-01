import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import pxToDp from '../../utils/pxToDp'
import Icon from 'react-native-vector-icons/Ionicons'
const BookMenu = (props)=> {
  const {item, index, bookId} = props
  const readBook = (id)=> {
    requestAnimationFrame(()=> props.navigation.navigate('ReadPage', {bookId, chapterId: id}))
  }
  return (
    <View> 
      <TouchableOpacity onPress={()=> readBook(item.id)} activeOpacity={0.6} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} >
        <Text numberOfLines={1} style={{color: !item.free?'#999':'#333', fontSize: pxToDp(30), lineHeight: pxToDp(66)}}>{item.title}</Text>
        {!item.free&&<Icon name='ios-lock-outline' color='#333' size={20}/>||null}
      </TouchableOpacity>
      {
        item.children.map((child, i)=> (
          <TouchableOpacity onPress={()=> readBook(child.id)} activeOpacity={0.6} key={i} style={{paddingLeft: pxToDp(30), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} >
            <Text numberOfLines={1} style={{color: !child.free?'#999':'#666', fontSize: pxToDp(30), lineHeight: pxToDp(66)}}>{child.title.replace(/[\.]/g,'．')}</Text>
            {!child.free&&<Icon name='ios-lock-outline' color='#666' size={20}/>||null}
          </TouchableOpacity>
        ))
      } 
    </View>
  )
}

const styles = StyleSheet.create({
  
})
export default BookMenu
