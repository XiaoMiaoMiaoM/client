import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Cookies  from 'js-cookies'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NavFooter from '../../componnets/nav-footer/nav-footer'
import {getUser} from "../../redux/actions";
import {getRedirectPath} from "../../utils/index";
import Chat from '../chat/chat'


class Main extends Component{
   navList = [
     {
       path: '/laoban', // 路由路径
       component: Laoban,
       title: '大神列表',
       icon: 'dashen',
       text: '大神',
     },
     {
       path: '/dashen', // 路由路径
       component: Dashen,
       title: '老板列表',
       icon: 'laoban',
       text: '老板',
     },
     {
       path: '/message', // 路由路径
       component: Message,
       title: '消息列表',
       icon: 'message',
       text: '消息',
     },
     {
       path: '/personal', // 路由路径
       component: Personal,
       title: '用户中心',
       icon: 'personal',
       text: '个人',
     }
   ]
   componentDidMount() {
     const userid=Cookies.get('userid')
     const {_id}=this.props.user
     if(userid&&!_id){
       this.props.getUser()
     }
   }

   render () {
     // 判断用户是否登陆(cookie中是否有userid), 如果没有, 自动跳转到登陆界面
     const userid = Cookies.get('userid')
     if(!userid) {
       return <Redirect to='/login'/>
     }
     const {user} = this.props
     if(!user._id){
       return <div>LOADING...</div>
     }
     // 3. 如果redux的user中已经有信息(已经登陆), 如果请求的是应用根路径, 自动跳转到对应的主界面
     // 当前请求的path
     const path= this.props.location.pathname
     if (path==='/'){
       return <Redirect to={getRedirectPath(user.type,user.header)}/>
     }


     const navList = this.navList

     // 当前请求的path
     const path = this.props.location.pathname
     // 得到当前nav对象
     const currentNav = navList.find(nav => path===nav.path)

     // 动态确定哪个nav需要隐藏
     const {type} = this.props.user
     if(type==='laoban') {
       navList[1].hide = true
     } else {
       navList[0].hide = true
     }

     return (
       <div>
         {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}

         <Switch>
           <Route path='/laobaninfo' component={LaobanInfo}/>
           <Route path='/dasheninfo' component={DashenInfo}/>

           <Route path='/laoban' component={Laoban}/>
           <Route path='/dashen' component={Dashen}/>
           <Route path='/message' component={Message}/>
           <Route path='/personal' component={Personal}/>
           <Route path='/chat/:userid' component={Chat}/>
         </Switch>

         {currentNav ? <NavFooter navList={this.navList}/> : null}

       </div>
     )
   }
}
export default connect(
  state=>({user:state.user}),
  {getUser}
)(Main)