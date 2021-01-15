import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//全局挂载axios
Vue.prototype.$http =axios
//引入elementUI
import elementUI from 'element-ui'
/* 引入element ui样式 */
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
