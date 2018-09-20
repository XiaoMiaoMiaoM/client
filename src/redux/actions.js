/*
包含n个action creator函数的模块
同步action: 对象
异步action: dispatch函数
 */
import {
  reqLogin,
  reqRegister,
  reqUpdateUser
} from '../api'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from './action-types'
import {reqUser} from "../api/index";

const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})
const errorMsg =(msg)=>({type:ERROR_MSG,data:msg})
const receiveUser=(user)=>({type:RECEIVE_USER,data:user})

export const resetUser=(msg)=>({type:RESET_USER,data:msg})

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
    const response = await reqRegister(user)
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
export const getUser = () =>{
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