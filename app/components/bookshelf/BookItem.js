import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import pxToDp from '../../utils/pxToDp'
import {fomatDate} from '../../utils'
const BookItem = (props)=> {
  const {item} = props
  
  const goBookDetail = (bookId)=> {
    requestAnimationFrame(()=> props.navigation.navigate('ReadPage', {bookId}))
  }
  return (
    <View style={styles.container}> 
      <TouchableOpacity onPress={()=> requestAnimationFrame(() => props.navigation.navigate('BookDetail', {bookId: item.bookId}))} activeOpacity={0.7} style={styles.item}>
        <View style={styles.shadow}>
          <Image style={styles.bookImg} source={{uri: item.bookCover + '@174w'}}/>
        </View>
        <View style={{paddingLeft: pxToDp(42)}}>
          <Text numberOfLines={1} style={styles.bookName}>{item.bookName}</Text>
          <Text style={styles.txt} numberOfLines={1}><Text style={styles.gray}>作者：</Text>{item.author}</Text>
          <Text style={styles.txt} numberOfLines={1}><Text style={styles.gray}>出版社：</Text>{item.pressName}</Text>
          <Text style={styles.txt} numberOfLines={1}><Text style={styles.gray}>出版：</Text>{fomatDate(item.createTime)}</Text>
          {
            item.discountPrice?
              <Text style={styles.txt} numberOfLines={1}><Text style={styles.price}>¥{item.discountPrice}&nbsp;&nbsp;</Text><Text style={styles.gray}>原价：</Text><Text style={{textDecorationLine:'line-through'}}>¥{item.ebookPrice}</Text></Text>
            : <Text style={styles.txt} numberOfLines={1}><Text style={styles.gray}>售价：</Text>0</Text>            
          }
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={()=> goBookDetail(item.bookId)} style={styles.readNow}>
          <Text style={{color: '#fff', fontSize: pxToDp(28)}}>立即阅读 <Icon color={'#fff'} style={{backgroundColor: 'rgba(0,0,0,0)'}} name='arrow-right' size={pxToDp(26)}/></Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: pxToDp(20),
    backgroundColor: '#fff',
    paddingTop: pxToDp(32),
    paddingBottom: pxToDp(32),
    paddingLeft: pxToDp(40),
    paddingRight: pxToDp(40),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bookImg: {
    height: pxToDp(268),
    width: pxToDp(190),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  shadow: {
    shadowColor:'#ccc', 
    shadowOffset:{width: pxToDp(3), height: pxToDp(2)},
    shadowRadius: pxToDp(7),
    shadowOpacity: 1,
  }, 
  readNow: {
    position: 'absolute',
    right: -pxToDp(40),
    top: pxToDp(35),
    paddingTop: pxToDp(15),
    paddingBottom: pxToDp(15),
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(15),
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: '#ffbf01',
  },
  bookName: {
    width: pxToDp(250),
    fontSize: pxToDp(32)
  },
  txt: {
    marginTop: pxToDp(20),
    color: '#000',
    fontSize: pxToDp(28)
  },
  gray: {
    color: '#666',
  },
  price: {
    color: '#f00',
    fontSize: pxToDp(29),
  }
})
export default BookItem
