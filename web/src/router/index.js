import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Community from '../views/Community.vue'
import Category from '../views/Category.vue'
import MenuDetail from '../views/MenuDetail.vue'
import MenuList from '../views/MenuList.vue'
import SearchList from '../views/SearchList.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import Add from '../views/Add.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/login',component:Login,meta: { isPublic: true }},
  {path:'/register',component:Register,meta: { isPublic: true }},
  {path:'/',component:Main,
    children:[
      {   path:'/',component: Home},
      {   path: '/home', component: Home,meta: { isPublic: true }},
      {   path: '/community', component:Community,meta: { isPublic: true }},
      {   path: '/category', component:Category,meta: { isPublic: true }},
      {   path: '/personalcenter', component:PersonalCenter},
      {   path: '/add', component:Add},
]},
      {   path:'/menu/detail/:id',component: MenuDetail,props:true,meta: { isPublic: true }}, 
      {   path:'/article/detail/:id',component: ArticleDetail,props:true,meta: { isPublic: true }}, 
     {   path:'/menu/list/:id',component: MenuList,props:true,meta: { isPublic: true }}, 
     {   path:'/menu/list',component: MenuList,meta: { isPublic: true }}, 
     {   path:'/search/list',component: SearchList,meta: { isPublic: true }}, 
 
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {  //如果不是公开访问的页面并且不存在用户token时跳转到登录页
    return next('/login')
  }
  next()
})
export default router
