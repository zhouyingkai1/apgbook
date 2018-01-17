import React from 'react'
import theme from '../../utils/theme'
import pxToDp from '../../utils/pxToDp'
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'

const TabView = (props)=> {
  const {activeTextColor='navy', inactiveTextColor='#666', backgroundColor= null, activeTab, tabs, children, translateValue, textStyle, changeTab } = props
  const renderTab = (name, page, isTabActive, onPressHandler)=> {
    const textColor = isTabActive ? activeTextColor : inactiveTextColor
    return <TouchableOpacity
      style={{flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => changeTab(page)}
      activeOpacity={.7}
    >
      <View style={[styles.tab, props.tabStyle, ]}>
        <Text style={[{color: textColor}, textStyle, ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>;
  }

    const containerWidth = theme.screenWidth;
    const numberOfTabs = tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: pxToDp(4),
      backgroundColor: 'navy',
      bottom: -pxToDp(2),
    };

    // const translateX = props.scrollValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0,  containerWidth / numberOfTabs],
    // });
    return (
      <View style={[styles.tabs, props.style, ]}>
        {tabs.map((name, page) => {
          const isTabActive = activeTab === page
          return renderTab(name, page, isTabActive, props.goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            props.underlineStyle,
            {
              transform: [
                { translateX: translateValue.interpolate({
                  inputRange: [0,1],
                  outputRange: [0, theme.screenWidth]
                })},
              ]
            },
          ]}
        />
      </View>
    )
}
const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: pxToDp(88),
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: pxToDp(1),
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#c7c7c7',
  },
})

export default TabView