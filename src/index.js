/*
入口js
 */

//映射路由
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'


import store from './redux/store'
import Login from './containers/login/login'
import Register from './containers/register/register'
import Main from './containers/main/main'

import  './assets/css/index.less'
ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route component={Main}/>{/*默认路由组件*/}
      </Switch>
    </HashRouter>
  </Provider>

), document.getElementById('root'))