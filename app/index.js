import React from 'react'
import { AppRegistry } from 'react-native'

import dva from './utils/dva'
import Router from './router'

import appModel from './models/app'
import routerModel from './models/router'
import homeModel from './models/homeModel'
import categoryModel from './models/categoryModel'
import rankModel from './models/rankModel'
import bookshelfModel from './models/bookshelfModel'
import bookDetailModel from './models/bookDetailModel'
import commentlModel from './models/commentModel'
import searchModel from './models/searchModel'
import loginModel from './models/loginModel'
import newsModel from './models/newsModel'
import pressModel from './models/pressModel'
import pressDetailModel from './models/pressDetailModel'

const app = dva({
  initialState: {},
  models: [appModel, routerModel, homeModel, categoryModel, rankModel, bookshelfModel,
    bookDetailModel, commentlModel, searchModel, loginModel, newsModel, pressModel, pressDetailModel],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)

AppRegistry.registerComponent('mzCoachRN', () => App)
