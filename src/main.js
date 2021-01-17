import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
/* import env from '@/env.js' */
import VueAxios from 'vue-axios'
//引入elementUI
import elementUI from 'element-ui'
/* 引入element ui样式 */
import 'element-ui/lib/theme-chalk/index.css'

//统一拦截代码
//接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data
  //获取数据成功,直接返回data
  if(res.status ==0){
    return res.data
    //获取数据不成功,强制跳转到登录页面
  }else if(res.status ==10){
    window.location.href = '/#/login'
  }else{
    alert(res.msg)
  }
})
//设置基准地址
//1.根据前端的跨域方式做调整(1.是否涉及跨域,2.使用什么方式解决跨域 如果是代理,域名一样,如果是jsonp,地址就要写转发地址)
//根据环境变量获取不同的请求地址
/* axios.defaults.baseURL='env.baseURL'; */
//接口超时
/* axios.defaults.baseURL='/api' */
axios.defaults.timeout = 8000


Vue.use(elementUI)
Vue.use(VueAxios,axios)

//关闭生产环境
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
