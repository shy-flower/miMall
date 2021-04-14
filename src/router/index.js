import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home.vue'
import Index from '@/pages/index.vue'
// import Product from '@/pages/product.vue'
// import Detail from '@/pages/detail.vue'
// import Cart from '@/pages/cart.vue'
import Order from '@/pages/order.vue'
import Confirm from '@/pages/Confirm.vue'
import OrderList from '@/pages/orderList.vue'
import OrderPay from '@/pages/orderPay.vue'
import AliPay from '@/pages/aliPay.vue'
// import Login from '@/pages/login.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/', name:'home', redirect:"/index",component:Home,children:[
    {path:'/index',name:'index',component:Index},
    {path:'/product/:id',name:'product',component:()=> import('@/pages/product.vue')},
    {path:'/detail/:id',name:'detail',component:()=> import('@/pages/detail.vue')},
  ]},
  {path:'/cart',name:'cart',component:()=> import('@/pages/cart.vue')},
  {path:'/login',name:'login',component:()=> import('@/pages/login.vue')},

  {path:'/order',name:'order',component:Order ,children:[
    {path:'confirm',name:'confirm',component:Confirm},
    {path:'list',name:'order-List',component:OrderList},
    {path:'pay',name:'order-Pay',component:OrderPay},
    {path:'aliPay',name:'aliPay',component:AliPay},

  ]},

]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫

export default router
