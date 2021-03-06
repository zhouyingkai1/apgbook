import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import pxToDp from '../../utils/pxToDp'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import {dateFormat} from '../../utils'
import theme from '../../utils/theme'
import TextButton from '../common/TextButton'
import KeyboardSpacer from 'react-native-keyboard-spacer'
const Comment = (props)=> {
  const {item, update, deleModal, handlePraise, deleteComment, bookInfo, navigation, showAllList, replyComment} = props
  const {avatar, name, uid} = item.creator
  const loadMore = ()=> {
    if(bookInfo){
      requestAnimationFrame(()=> navigation.navigate('CommentDetail',{bookId: bookInfo.bookId, title: bookInfo.bookName}))
    }else{
      showAllList.push(item.id)
      update('showAllList', showAllList)
    }
  }
  //收起
  const handleLess = ()=> {
    const newShowAllList = showAllList.filter((res)=> res!=item.id)
    update('showAllList', newShowAllList)
  }
  return (
    <View style={{marginBottom: pxToDp(60)}}> 
      <View activeOpacity={0.6} style={styles.box}>
        <Image style={styles.img} source={{uri: `${avatar || 'http://img1.timeface.cn/ts/avatar/a444a96ef1a6aa6ffdf371a12ad6d8500.jpg'}@60w`}}/>
        <View style={styles.content}>
          <Text>{name}</Text>
          <Text style={styles.comment}>{item.content}</Text>
          {
            !!item.replys&&item.replys.length>0?
              <View onPress={()=> {
                requestAnimationFrame(()=> {
                  
                })
              }} activeOpacity={0.7} style={styles.replyBox}>
                {
                  item.replys.map((child, i)=> {
                    if(i<3 || showAllList&&showAllList.includes(item.id)){
                      return (
                        <Text key={i} style={{ fontSize: pxToDp(28), lineHeight: pxToDp(40)}}>
                          <Text style={{color: '#3478f7'}}>{child.creator.name}：</Text>{child.content}
                          <Text style={{fontSize: pxToDp(28), color: '#b1b1b1'}}>&nbsp;&nbsp;&nbsp;&nbsp;{dateFormat(child.createTime, 'yyyy-MM-dd hh:mm')}</Text>  
                        </Text>
                      )
                    }{
                      return null
                    }
                  })
                }   
                {item.replys.length>3&&!showAllList || ( item.replys.length>3 && showAllList&&!showAllList.includes(item.id)) ?
                  <TouchableOpacity onPress={loadMore}>
                    <Text style={{marginTop: pxToDp(10),color: '#3478f7'}}>更多{item.replys.length - 3}条回复</Text>
                  </TouchableOpacity>
                  : null}
                {item.replys.length>3&&showAllList&&showAllList.includes(item.id)?
                <TouchableOpacity onPress={handleLess}>
                  <Text style={{marginTop: pxToDp(10),color: '#3478f7'}}>收起</Text>
                </TouchableOpacity>
                : null}
              </View>:null
          }
          <View style={styles.info}>
            <Text style={styles.time}>{dateFormat(item.createTime, 'yyyy-MM-dd hh:mm:ss')}</Text>
            <View style={styles.icon}>
              <TextButton onPress={()=> handlePraise(item.islike, item.id)} Child={()=> <FontAwesome size={pxToDp(32)} name={!item.islike?'thumbs-up':'thumbs-o-up'} color={!item.islike?theme.mainColor:'#999'}/>}/>
              <Text style={styles.num}>{item.likeNum}</Text>
              <TextButton onPress={()=> replyComment({name: item.creator.name, parentId: item.id})}  Child={()=> <MaterialCommunityIcons size={pxToDp(32)} color='#999' name='comment-text-outline'/>}/>
              <Text style={styles.num}>{item.replyTotal}</Text>
              {item.canDelete?<TextButton onPress={()=> deleteComment(item.id)}  Child={()=> <MaterialCommunityIcons size={pxToDp(36)} color='#999' name='delete-forever'/>}/>:null}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  img: {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(30)
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: pxToDp(10)
  },
  content: {
    marginLeft: pxToDp(20),
    flex: 1
  },
  comment: {
    marginTop: pxToDp(10), 
    marginBottom: pxToDp(15), 
    lineHeight: pxToDp(35),
    fontSize: pxToDp(28)
  },
  time: {
    color: '#999'
  },
  num: {
    color: '#999',
    marginLeft: pxToDp(10),
    marginRight: pxToDp(15),
    fontSize: pxToDp(27)
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center' 
  },
  replyBox: {
    backgroundColor: '#f3f3f5',
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    paddingBottom: pxToDp(20),
    paddingTop: pxToDp(20),
  },
  model: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingBottom: pxToDp(30),
  },
  list: {
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
    paddingTop: pxToDp(30),
    flex: 1
  }
})
export default Comment
