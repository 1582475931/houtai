// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//重置样式
import './assets/css/reset.css'
//axios
import axios from 'axios';

router.beforeEach((to,from,next)=>{
if(to.path=='/login'){
  next();
  return;
}
if(to.path.includes("welcome")){
  if(sessionStorage.getItem('type')==0||sessionStorage.getItem('type')==1){
    next();
  }else{
    next("/login");
  }
  return;
}
if(to.path.includes("mong")){
  if(sessionStorage.getItem('type')==0){
    next();
  }else{
    next("/login");
  }
  return;
}

if(!to.path.includes("mong")){
  if(sessionStorage.getItem('type')==1){
    next();
  }else{
    next("/login");
  }
  return;
}
next();

})
Vue.prototype.axios=axios;

//element框架
import ElementUI, { TabPane } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Filter from './filter/index'
for(var i in Filter){
  Vue.filter(i,Filter[i])
}


import store from "./store/index";
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
