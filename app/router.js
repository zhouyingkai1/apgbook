import React, { PureComponent } from 'react'
import pxToDp from './utils/pxToDp'
import { BackHandler, Animated, Easing, ScrollView, View, Text } from 'react-native'
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers,
  NavigationActions,
  DrawerNavigator ,
  DrawerItems
} from 'react-navigation'
import { connect } from 'react-redux'
import SidebarView from './components/common/Sider'
import Home from './containers/Home'
import Category from './containers/Category'
import Press from './containers/Press'
import Rank from './containers/Rank'
import Detail from './page/Detail'
import Bookshelf from './page/Bookshelf'
import BookDetail from './page/BookDetail'
import MenuDetail from './page/MenuDetail'
import CommentDetail from './page/CommentDetail'
import ReadPage from './page/ReadPage'
import SearchPage from './page/SearchPage'
import Login from './page/Login'
import News from './page/News'
import Collect from './page/Collect'
import PressDetail from './page/PressDetail'

const HomeNavigator = TabNavigator(
  {
    Home: { screen: Home },
    Category: { screen: Category },
    Rank: { screen: Rank },
    Press: { screen: Press },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: true,
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        marginBottom: 5,
      },
      upperCaseLabel:false,
      inactiveTintColor: '#999',
      activeTintColor: '#f4c043',
      style: {
        backgroundColor: '#fff',
      }
    },
   
  }
)
const options = {
  headerStyle: {
    backgroundColor: '#f4c043',
    borderBottomWidth: 0
  },
  gesturesEnabled: true,  
  headerTitleStyle: {
    color: '#fff',
  }
}

const AppDrawerNavigator = DrawerNavigator(
  {
    //定义侧边栏内容视图
    DrawerContent: {
      screen: HomeNavigator,
      // navigationOptions: {
      //   header: null,
      // }
    }
  },
  {
    drawerOpenRoute: 'DrawerOpen', 
    drawerCloseRoute: 'DrawerClose', 
    drawerToggleRoute: 'DrawerToggle',
    //定义侧边栏抽屉视图
    drawerWidth:pxToDp(600),
    contentComponent: props =>
      <View style={{flex: 1}}>
        <SidebarView {...props}/>
      </View>
  },
)


const MainNavigator = StackNavigator({
  AppDrawerNavigator: {
    screen: AppDrawerNavigator,
    // navigationOptions: {
    //     header:null
    // }
  },
  Bookshelf: { screen: Bookshelf },
  BookDetail: { screen: BookDetail },
  ReadPage: { screen: ReadPage },
  SearchPage: { screen: SearchPage },
  News: { screen: News },
  Collect: { screen: Collect },
  PressDetail: { screen: PressDetail },
  
},  {
  navigationOptions: {
    header: null
  }
})
const AppNavigator = StackNavigator(
  {
    Main: { screen: MainNavigator },
    MenuDetail: { screen: MenuDetail },
    CommentDetail: { screen: CommentDetail },
    Login: {screen: Login},
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return { opacity, transform: [{ translateY }] }
      },
    }),
  }
)

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const { dispatch, app, router } = this.props

    const navigation = addNavigationHelpers({ dispatch, state: router })
    return <AppNavigator navigation={navigation} />
  }
}

export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state)
}


export default connect(({ app, router }) => ({ app, router }))(Router)
