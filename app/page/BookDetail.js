import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView, Animated, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import {Header, Alert, TabView, BookMenu} from '../components'
import Toast from 'react-native-root-toast'
import theme from '../utils/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Storage, fomatDate, NavigationActions } from '../utils'
import { hotBook } from '../services/bookDetailServices';
// import HTML from 'react-native-render-html'
class BookDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      translateValue: new Animated.Value(0)
    }
  }
  componentWillMount() {
    const {bookInfo, bookId: oldBookId} = this.props.bookdetail
    const { bookId } = this.props.navigation.state.params
    if(oldBookId != bookId){
       //避免记录旧数据，重新渲染新数据的视觉卡顿
      this.update('bookInfo', {})
      this.props.dispatch({
        type: 'bookdetail/update',
        payload: {
          bookId,
          bookInfo: {}
        }
      })
    }
    this.update('tab', 0)
  }
  async componentDidMount() { 
    const {bookInfo, bookId: oldBookId} = this.props.bookdetail
    const { bookId } = this.props.navigation.state.params
    // 取书本详情
    const oldBookInfo = await Storage.get(`bookInfo${bookId}`)
    if(!oldBookInfo) {
      this.fetchData('getBookInfo', {bookId})
    }else{
      bookId != oldBookId && this.update('bookInfo', oldBookInfo)
    }
    //从缓存中取 热门书籍 
    const hotBook = await Storage.get(`hotBook`)
    if(!hotBook) {
      this.fetchData('getHotBook', {type: [1], number: [12]})
    }else {
      this.update('hotBook', hotBook)
    }
    //请求 目录
    this.fetchData('getBookMenu', {book_uid: bookId})
  }
  update = (name, val)=> {
    this.props.dispatch({
      type: 'bookdetail/update',
      payload: {
        [name]: val 
      }
    })
  }
  fetchData = (type, payload) => {
    this.props.dispatch({
      type: `bookdetail/${type}`,
      payload
    })
  } 
  handle = ()=> {
    this.update('visible', true)
  }
  resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'AppDrawerNavigator'})
    ]
  })
  // 收藏 取消收藏
  handleCollect = (bookInfo)=> {
    this.fetchData('hanldeCollect', {bookInfo})
  }
  headRight = ()=> {
    const { bookInfo } = this.props.bookdetail
    return (
      <View style={{flexDirection: 'row', marginTop: pxToDp(28), backgroundColor: 'rgba(0,0,0,0)'}}>
        <TouchableOpacity onPress={()=> this.handleCollect(bookInfo)} style={{width: pxToDp(80), height: pxToDp(60)}}>
          <FontAwesome name={!!bookInfo.isCollect? 'star':'star-o'} style={{marginRight: pxToDp(40)}} size={pxToDp(44)} color={!!bookInfo.isCollect?'#f6c243': '#fff'}/>
        </TouchableOpacity>
        <TouchableOpacity style={{width: pxToDp(60), height: pxToDp(60)}} onPress={()=> requestAnimationFrame(()=> this.props.navigation.dispatch(this.resetAction))}>
          <SimpleLineIcons name='home' size={pxToDp(40)} color='#fff'/>
        </TouchableOpacity>
      </View> 
    )
  }
  // 换一批 热门书籍
  changeBookList = ()=> {
    requestAnimationFrame(()=> {
      const {hotBookIndex} = this.props.bookdetail
      if(hotBookIndex == 3) {
        this.update('hotBookIndex', 0)
      }else{
        this.update('hotBookIndex', hotBookIndex + 1 )
      }
    })
  }
  //在当前页换书
   changeBook = async (newBook)=> {
    this.update('bookId', newBook.bookId)
    const { bookInfo } = this.props.bookdetail
    if(bookInfo.bookId === newBook.bookId) {
      return
    }else{
      const bookInfo = await Storage.get(`bookInfo${newBook.bookId}`)
      if(!bookInfo) {
        this.fetchData('getBookInfo', {bookId: newBook.bookId})
      }else{
        this.update('bookInfo', bookInfo)
      }
    }
    this.fetchData('getBookMenu', {book_uid: newBook.bookId})
    this.refs.scrollView.scrollTo({x: 0, y: 0, animated: true})
  }
  onRefresh = ()=> {
    this.update('isRefreshing', true)
    this.fetchData('getBookInfo', {bookId: this.props.bookdetail.bookId})
  }
  render() {
    const {params} = this.props.navigation.state
    const {visible, bookInfo, tab, hotBook, hotBookIndex, isRefreshing, menu} = this.props.bookdetail
    const hotBookList = hotBook.slice(hotBookIndex * 3, (hotBookIndex+1)*3)
    return (
      <View style={{flex: 1}}>
        <Header right={this.headRight} title={params.title} {...this.props}/>
        <ScrollView 
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefresh}
              tintColor={theme.mainColor}
              progressBackgroundColor="#ffff00" 
            />
          }
          ref='scrollView' style={{flex: 1}}>
            {/* 顶部 书本信息 */}
          <View style={styles.top}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.shadow}>
                {bookInfo.bookCover&&<Image style={styles.bookImg} source={{uri: `${bookInfo.bookCover}@196w`}}/>}
              </View>
              <View style={{paddingLeft: pxToDp(42)}}>
                <Text numberOfLines={1} style={styles.bookName}>{bookInfo.bookName}</Text>
                <Text style={{marginTop: pxToDp(18), color: '#999', fontSize: pxToDp(27)}}>
                  <Text >{bookInfo.commentNum}人评论</Text>
                  <View style={{borderRightWidth: pxToDp(1), width: 10, height: pxToDp(27), position: 'relative', top: pxToDp(10),borderColor: '#999'}}></View>
                  <View style={{borderRightWidth: pxToDp(1), width: 10, height: 0}}></View>
                  <Text>{bookInfo.readNum}人在读</Text>
                </Text>
                <Text style={styles.txt} numberOfLines={1}><Text style={styles.gray}>作者：</Text>{bookInfo.author}</Text>
                <Text style={styles.txt} numberOfLines={1}><Text style={styles.gray}>出版社：</Text>{bookInfo.pressName}</Text>
                <Text style={styles.txt} numberOfLines={1}><Text style={styles.gray}>出版：</Text>{fomatDate(bookInfo.createTime)}</Text>
                {
                  bookInfo.discountPrice?
                    <Text style={styles.txt} numberOfLines={1}><Text style={styles.price}>¥{bookInfo.discountPrice}&nbsp;&nbsp;</Text><Text style={styles.gray}>原价：</Text><Text style={{textDecorationLine:'line-through'}}>¥{bookInfo.ebookPrice}</Text></Text>
                  : <Text style={styles.txt} numberOfLines={1}><Text style={styles.gray}>售价：</Text>0</Text>            
                }
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: pxToDp(22)}}>
              <TouchableOpacity style={[styles.btn, styles.readBtn]}>
                <Text>阅读</Text>
              </TouchableOpacity> 
              {
                bookInfo.discountPrice?
                <TouchableOpacity style={[styles.btn, styles.buyBtn]}>
                  <Text>购买</Text>
                </TouchableOpacity> : null
              } 
            </View>
          </View>
            {/* 中间 tab 栏 */}
          <View style={{backgroundColor: '#fff', marginTop: pxToDp(20)}}>
            <TabView 
              activeTab={tab}
              changeTab={(page)=> {
                this.update('tab', page)
                Animated.timing(this.state.translateValue, {
                  toValue: page * 0.333,
                  duration: 400,
              }).start();
              }} 
              tabs={['简介', `目录(${menu.length})`, `评论(${bookInfo.commentNum})`]}
              activeTextColor='#f6c243'
              textStyle={{}}
              underlineStyle={{backgroundColor: '#f6c243'}}
              translateValue={this.state.translateValue}
            />
            {tab == 0&&
              <View style={[styles.tabCommon]}><Text style={{lineHeight: pxToDp(45), fontSize: pxToDp(30)}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bookInfo.description}</Text></View>}
            {tab == 1? 
              <View>
                <BookMenu menu={menu} {...this.props}/>
                {
                  menu.length>6&&<TouchableOpacity activeOpacity={0.6} style={{ marginBottom: pxToDp(30), alignItems: 'center'}}>
                    <Text style={{color: '#999'}}>更多目录>></Text>
                  </TouchableOpacity>
                }
              </View>: null}
            {tab == 2? 
              <View>
                <Text>评论</Text>
              </View>
              : null}
          </View> 
          {/* 出版社 */}
          <View style={[styles.common]}>
            <View style={[styles.borderView]}>
              <View style={styles.border}></View>
              <Text style={{fontSize: pxToDp(29), marginLeft: pxToDp(14)}}>{bookInfo.pressName}</Text>
              <TouchableOpacity>
                <Text style={{color: '#b1b1b1'}}>进入书店<SimpleLineIcons color={'#b1b1b1'} name='arrow-right' size={pxToDp(26)}/></Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={{ borderTopWidth: pxToDp(1), borderColor: '#c7c7c7', marginBottom: pxToDp(34)}}></View>
              <View style={{alignItems: 'center', marginBottom: pxToDp(14)}}>
                {!!bookInfo.pressDto&&!!bookInfo.pressDto.logo&&<Image style={styles.img} source={{uri: bookInfo.pressDto&&bookInfo.pressDto.logo}}/>}
              </View>
            </View>
          </View>   
            {/* 热门书籍 */}
          <View style={[styles.common]}>
            <View style={styles.borderView}>
              <View style={styles.border}></View>
              <Text style={{fontSize: pxToDp(29), marginLeft: pxToDp(14)}}>热门书籍</Text>
              <TouchableOpacity onPress={()=> this.changeBookList()}>
                <Text style={{color: '#b1b1b1'}}>换一批&nbsp;<SimpleLineIcons style={{position: 'relative', top: pxToDp(4)}} color={'#b1b1b1'} name='refresh' size={pxToDp(26)}/></Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={{ height: pxToDp(1), backgroundColor: '#c7c7c7', marginBottom: pxToDp(34)}}></View>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                {
                  hotBookList.map((item, index)=> (
                    <TouchableOpacity key={index} onPress={()=> this.changeBook(item)} activeOpacity={0.7} style={styles.item}>
                      <View style={styles.shadow}>
                        <Image style={styles.bookImg} source={{uri: item.bookCover + '@174w'}}/>
                      </View>
                      <Text style={[styles.bookName, {marginTop: pxToDp(12), marginBottom: pxToDp(8)}]} numberOfLines={1}>{item.bookName}</Text>
                      <View style={[!item.discountPrice&&styles.freeBg]}>
                        <Text style={[!item.discountPrice?styles.free:styles.price]}>{item.discountPrice?'¥'+item.discountPrice: '免费'}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
                
              </View>
            </View>
            
          </View>     
        </ScrollView>
        <Alert
          onBackdropPress={()=> this.update('visible', false)} 
          txt='为了您的使用体验，请允许我使用手机相册请允许我使用手机相册' 
          visible={visible}
          onOkPress={()=> Toast.show('确定')}
          okTxt='可以打开'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  top: {
    paddingLeft: pxToDp(40),
    paddingRight: pxToDp(40),
    paddingBottom: pxToDp(32),
    paddingTop: pxToDp(32),
    backgroundColor: '#fff'
  },
  item: {
    width: pxToDp(190),
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
  bookName: {
    fontSize: pxToDp(32)
  },
  txt: {
    marginTop: pxToDp(18),
    color: '#000',
    fontSize: pxToDp(28)
  },
  gray: {
    color: '#666',
  },
  price: {
    color: '#f00',
    fontSize: pxToDp(29),
  },
  btn: {
    width: pxToDp(240),
    height: pxToDp(77),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: pxToDp(1),
    borderColor: '#ffbf01',
    borderRadius: 4,
  },
  readBtn: {
    marginRight: pxToDp(30),
  },
  buyBtn: {
    backgroundColor: '#ffbf01',
  },
  common: {
    backgroundColor: '#fff',
    marginTop: pxToDp(20),
    // paddingLeft: pxToDp(27),
    // paddingRight: pxToDp(27),
    paddingBottom: pxToDp(23),
    paddingTop: pxToDp(23),
  },
  
  tabCommon: {
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
    paddingBottom: pxToDp(30),
    paddingTop: pxToDp(30),
  },
  borderView: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: pxToDp(20),
    paddingLeft: pxToDp(27),
    paddingRight: pxToDp(27),
  },
  border: {
    height: pxToDp(36),
    width: pxToDp(8),
    position: 'absolute',
    left: pxToDp(20),
    top: pxToDp(-4),
    borderLeftWidth: 4,
    borderLeftColor: '#ffbf01',
  },
  img: {
    width: pxToDp(420),
    height: pxToDp(120),
  }
})
const mapStateToProps = ({app, router, bookdetail})=> {
  return {app, router, bookdetail}
}
export default connect(mapStateToProps)(BookDetail)
