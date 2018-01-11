import React from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import pxToDp from '../../utils/pxToDp'
import TextButton from '../common/TextButton'
const HomeItem = (props)=> {
  const {title, type, data} = props
  const renderItem = ({item})=> {
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.item}>
        <View style={styles.shadow}>
          <Image style={styles.bookImg} source={{uri: item.bookCover + '@174w'}}/>
        </View>
        <Text style={styles.bookName} numberOfLines={1}>{item.bookName}</Text>
        <View style={[!item.discountPrice&&styles.freeBg]}>
          <Text style={[!item.discountPrice?styles.free:styles.price]}>{item.discountPrice?'¥'+item.discountPrice: '免费'}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const _keyExtractor = (item, index) => item.bookId
  return (
    <View style={styles.container}> 
      <View style={styles.head}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.more}>
          <Text style={{color: '#999', fontSize: pxToDp(30)}}>更多 <Icon color={'#999'} name='arrow-right' size={pxToDp(26)}/></Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
        horizontal={true}
        initialNumToRender={4}
        showsHorizontalScrollIndicator= {false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: pxToDp(20),
    backgroundColor: '#fff',
    paddingTop: pxToDp(35),
    paddingBottom: pxToDp(35),
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
  },
  head: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: pxToDp(36),
    textAlign: 'center',
    color: '#000' 
  },
  more: {
    position: 'absolute',
    right: 0,
    top: pxToDp(2)
  },
  line: {
    marginTop: pxToDp(28),
    width: pxToDp(54),
    height: pxToDp(4),
    backgroundColor: '#ffbf01',
    marginBottom: pxToDp(28)
  },
  item: {
    marginRight: pxToDp(44),
    width: pxToDp(174),
  },
  bookImg: {
    height: pxToDp(240),
    width: pxToDp(174),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  shadow: {
    shadowColor:'#ccc', 
    shadowOffset:{width: pxToDp(3), height: pxToDp(2)},
    shadowRadius: pxToDp(7),
    shadowOpacity: 1,
  }, 
  bookName: {
    fontSize: pxToDp(29),
    lineHeight: pxToDp(46)
  },
  free: { 
    color: '#fff',
    fontSize: pxToDp(30),
  },
  freeBg: {
    paddingLeft: pxToDp(4),
    paddingRight: pxToDp(4),
    borderRadius: 4,
    width: pxToDp(76),
    height: pxToDp(40),
    backgroundColor: '#ffbf01',
    alignItems: 'center',
    justifyContent: 'center'
  },
  price: {
    color: '#f00',
    fontSize: pxToDp(29)
  }
})
export default HomeItem
