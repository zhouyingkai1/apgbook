import React from 'react'
import { AppRegistry } from 'react-native'

import dva from './utils/dva'
import Router from './router'

import appModel from './models/app'
import routerModel from './models/router'
import homeModel from './models/homeModel'
import categoryModel from './models/categoryModel'
import rankModel from './models/rankModel'

const app = dva({
  initialState: {},
  models: [appModel, routerModel, homeModel, categoryModel, rankModel],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)

AppRegistry.registerComponent('mzCoachRN', () => App)
