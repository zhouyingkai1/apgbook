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
  const {item, update, deleModal} = props
  const {avatar, name, uid} = item.creator
  //删除评论
  const deleteComment = (id)=> {
    props.dispatch({
      type: 'bookdetail/deleteComment',
      payload: {
        comment_id: id
      }
    })
  }
  return (
    <View style={{marginBottom: pxToDp(60)}}> 
      <TouchableOpacity activeOpacity={0.6} style={styles.box}>
        <Image style={styles.img} source={{uri: `${avatar}@60w`}}/>
        <View style={styles.content}>
          <Text>{name}</Text>
          <Text style={styles.comment}>{item.content}</Text>
          {
            !!item.replys&&item.replys.length>0?
              <TouchableOpacity onPress={()=> {
                requestAnimationFrame(()=> {
                  
                })
              }} activeOpacity={0.7} style={styles.replyBox}>
                {
                  item.replys.map((child, i)=> {
                    if(i<3){
                      return (
                        <Text key={i} style={{ fontSize: pxToDp(28), lineHeight: pxToDp(40)}}>
                          <Text style={{color: '#3478f7'}}>{child.creator.name}：</Text>{child.content}
                        </Text>
                      )
                    }else{
                      return null
                    }
                  })
                }   
                {item.replys.length>3?<Text style={{marginTop: pxToDp(10),color: '#3478f7'}}>更多{item.replys.length - 3}条回复</Text>: null}
              </TouchableOpacity>:null
          }
          <View style={styles.info}>
            <Text style={styles.time}>{dateFormat(item.createTime, 'yyyy-MM-dd hh:mm:ss')}</Text>
            <View style={styles.icon}>
              <TextButton Child={()=> <FontAwesome size={pxToDp(32)} name={!item.islike?'thumbs-up':'thumbs-o-up'} color={!item.islike?theme.mainColor:'#999'}/>}/>
              <Text style={styles.num}>{item.likeNum}</Text>
              <TextButton  Child={()=> <MaterialCommunityIcons size={pxToDp(32)} color='#999' name='comment-text-outline'/>}/>
              <Text style={styles.num}>{item.replyTotal}</Text>
              {item.canDelete?<TextButton onPress={()=> deleteComment(item.id)}  Child={()=> <MaterialCommunityIcons size={pxToDp(36)} color='#999' name='delete-forever'/>}/>:null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* <Modal isOpen={commentModal} 
        onClosed={onBackdropPress}
        position='bottom'
        coverScreen={true}
        swipeToClose={false}
        style={{justifyContent: 'flex-end', height: '85%', backgroundColor: 'rgba(0,0,0,0.2)'}}

      >
        <View style={styles.model}>
          <FlatList 
            data={item.replys}
            keyExtractor={(item, index)=> index}
            initialNumToRender={30}
            style={styles.list}
            removeClippedSubviews={false}
            renderItem={({item})=> {
              return (
                <Text style={{ fontSize: pxToDp(28), lineHeight: pxToDp(40)}}>
                  <Text style={{color: '#3478f7'}}>{item.creator.name}：</Text>
                  {item.content}
                  <TextButton btnStyle={{width: pxToDp(60), height: pxToDp(60)}} textStyle={{color: '#3478f7'}} text='删除'/>
                </Text>
              )
            }}  
          />
          <View>
            <TextInput />
            <Text>发表</Text>
          </View>
          <KeyboardSpacer />
        </View>
      </Modal> */}
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
