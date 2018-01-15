import React, { PureComponent } from 'react'
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
import Login from './containers/Login'
import Home from './containers/Home'
import Category from './containers/Category'
import Press from './containers/Press'
import Rank from './containers/Rank'
import Detail from './page/Detail'
import Bookshelf from './page/Bookshelf'
import BookDetail from './page/BookDetail'

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
    drawerWidth:250,
    contentComponent: props =>
      <View>
        <SidebarView {...props}/>
      </View>
  },
)

const AppNavigator = StackNavigator({
    AppDrawerNavigator: {
      screen: AppDrawerNavigator,
      // navigationOptions: {
      //     header:null
      // }
    },
    Login: { screen: Login },
    Bookshelf: { screen: Bookshelf },
    BookDetail: { screen: BookDetail },
},  {
  navigationOptions: {
    header: null
  }
   })

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
