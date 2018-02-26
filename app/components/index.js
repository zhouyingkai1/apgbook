//公共组件
import Touchable from './common/Touchable'
import TextButton from './common/TextButton'
import Button from './common/Button'
import Header from './common/Header'
import Loading from './common/Loading'
import Alert from './common/Alert'
import TabView from './common/TabView'
import ListFooter from './common/ListFooter'
import LoadingWithBg from './common/LoadingWithBg'
//首页组件
import HomeItem from './home/HomeItem'
//分类组件
import TagItem from './category/TagItem'
//书架
import BookItem from './bookshelf/BookItem'
// 书本 目录 公用
import BookMenu from './bookDetail/BookMenu'
//书本 评论列表
import Comment from './bookDetail/Comment'
// 出版社列表
import PressList from './press/PressList'
module.exports={
  TextButton,
  Touchable,
  Button,
  Header,
  ListFooter,
  LoadingWithBg,
  HomeItem,
  TagItem,
  BookItem,
  Loading,
  Alert,
  TabView,
  BookMenu,
  Comment,
  PressList
}