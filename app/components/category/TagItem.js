import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import pxToDp from '../../utils/pxToDp'
const TagItem = (props)=> {
  const {itemData} = props
  return (
    <View> 
      {
        itemData.subCategoryDtos&&itemData.subCategoryDtos.length>0?
        <View style={styles.container}> 
          <View style={styles.head}>
            <Text style={styles.title}>{itemData.name}</Text>
          </View>
          <View style={styles.tagBox}>
            {
              itemData.subCategoryDtos.map((item, index)=> (
                <TouchableOpacity activeOpacity={0.6} style={styles.tag} key={index} >
                  <Text style={{color: '#000', fontSize: pxToDp(29)}}>{item.name}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
        : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: pxToDp(22),
  },
  head: {
    marginBottom: pxToDp(20),
    borderLeftWidth: 4,
    borderLeftColor: '#ffbf01',
    paddingLeft: pxToDp(20)
  },
  title: {
    
  },
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tag: {
    backgroundColor: '#fffaeb',
    paddingTop: pxToDp(15),
    paddingBottom: pxToDp(15),
    paddingLeft: pxToDp(25),
    paddingRight: pxToDp(25),
    marginRight: pxToDp(30),
    marginBottom: pxToDp(23),
  }
})
export default TagItem
