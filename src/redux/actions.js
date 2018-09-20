/*
包含n个action creator函数的模块
同步action: 对象
异步action: dispatch函数
 */
import io from 'socket.io-client'
import {
  reqLogin,
  reqRegister,
  reqUpdateUser,
  reqUser,
  reqUserList
} from '../api'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from './action-types'
import {reqUser} from "../api/index";

const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})
const errorMsg =(msg)=>({type:ERROR_MSG,data:msg})
const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
export const resetUser=(msg)=>({type:RESET_USER,data:msg})
export const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

export function register({username,password,password2,type}) {
  if(!username) {
    return errorMsg('必须指定用户名')
  } else if (!password){
    return errorMsg('必须指定密码')
  }else if (!type){
    return errorMsg('必须指定用户类型')
  }

  return async dispatch=> {
    const response = await reqRegister({username, password, type})
    const result = response.data
    if (result.code === 0) {
      const user = result.data
      dispatch(authSuccess(user))
    } else {
      const msg = result.msg
      dispatch(errorMsg(msg))
    }

  }

}
export function login(username,password) {

return async dispatch =>{
  if(!username){
    return dispatch(errorMsg('必须指定用户名'))
  }else if (!password){
    return dispatch(errorMsg('必须指定密码'))
  }
  const response = await  reqLogin(username,password)
  const result = response.data
      if(result.code===0){
        const user=result.data
        dispatch(authSuccess(user))
      }else {
        const msg = result.msg
        dispatch(errorMsg(msg))
      }
  }
}

//更新用户的异步action
export const updateUser=(user)=>{
  return async dispatch =>{
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code===0){
      const user =result.data
      dispatch(receiveUser(user))
    }else {
      const msg = result.msg
      dispatch(resetUser(msg))
    }
  }
}
//异步获取用户
export function getUser(){
  return async dispatch =>{
    const response = await reqUser()
    const result = response.data
    if(result.code===0){
      dispatch(receiveUser(result.data))
    }else {
      dispatch(resetUser(result.msg))
    }
  }
}
//获取用户列表的异步列表
export function getUserList(type) {
  return async dispatch=>{
    const response = await reqUserList(type)
    const result = response.data
    if(result.code===0) {
      const userList = result.data
      dispatch(receiveUserList(userList))
    }
  }
}

// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:4000')

// 绑定监听, 接收服务发送的消息
socket.on('receiveMsg', (chatMsg) => {
  console.log('浏览器接收到服务器返回的消息', chatMsg)
})

/*
发送聊天消息的异步action
 */
export function sendMsg ({content, from, to}) {
  return dispatch => {
    // 发消息
    socket.emit('sendMsg', {content, from, to})
    console.log('浏览器向服务器发消息', {content, from, to})
  }
}


