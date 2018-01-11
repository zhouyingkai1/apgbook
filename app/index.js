import React from 'react'
import { AppRegistry } from 'react-native'

import dva from './utils/dva'
import Router from './router'

import appModel from './models/app'
import routerModel from './models/router'
import homeModel from './models/homeModel'
import categoryModel from './models/categoryModel'

const app = dva({
  initialState: {},
  models: [appModel, routerModel, homeModel, categoryModel],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)

AppRegistry.registerComponent('mzCoachRN', () => App)
