import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
//登录
const login=()=>import('../pages/login.vue')

const welcome=()=>import('../pages/welcome.vue')
//首页
const index=()=>import('../pages/index.vue')

//管理员
const mong=()=>import("../pages/mong.vue");


//修改密码
const pass=()=>import('../pages/pass.vue');

const banner=()=>import('../pages/banner.vue');

//家教
const teacher=()=>import('../pages/teacher.vue')

//水站管理
const water=()=>import('../pages/water.vue')
//维修
const repair=()=>import('../pages/repair.vue');
//家政
const home=()=>import('../pages/home.vue')
export default new Router({
  routes: [
    {
      path:'/login',
      component:login
    }
,
{
  path:'/index',
  component:index,
  children:[
    
    {
      path:'welcome',
      component:welcome
    },
    {
      path:'mong',
      name:'管理员管理',
      component:mong
    },
    {
      path:'pass',
      name:'密码修改',
      component:pass
    },
    {
      path:'banner',
      name:'banner管理',
      component:banner
    }
    ,
    {
      path:'teacher',
      name:'家教管理',
      component:teacher
    },
    {
      path:'water',
      name:'水站管理',
      component:water
    },
    {
      path:'repair',
      name:'维护管理',
      component:repair
    },
    {
      path:'home',
      name:'家政管理',
      component:home
    },
    {
      path:'',
      redirect:'welcome'
    }
  ]
}
  ]
})
