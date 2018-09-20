/*
包含n个reducer函数的模块
reducer函数: 根据老的state和指定的action 生产新的state
 */

// 用来管理state 状态
//用来管理的数据是xxx
import {combineReducers} from 'redux'
import {getRedirectPath} from '../utils'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from './action-types'
const initUser={
  username:'',
  type:'',
  msg:'',
  redirectTo:''
}
function user (state=initUser,action) {
  switch (action.type){
    case AUTH_SUCCESS:
      const user = action.data
      return {...user,redirectTo:getRedirectPath(user.type,user.header)}
    case ERROR_MSG:
      const msg = action.data
      return {...state,msg}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser,msg:action.data}
    default:
      return state
  }
}

export default combineReducers({
  user
})
/*
combineReducers()执行的结果是一个新的reducer函数
整合后的reducer管理的状态结构为:  对象: {xxx: xxx(), yyy: yyy()}
 */