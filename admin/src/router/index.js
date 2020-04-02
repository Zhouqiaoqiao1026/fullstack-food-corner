import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import CategoryList from '../components/CategoryList.vue'
import CategoryEdit from '../components/CategoryEdit.vue'
import MenuList from '../components/MenuList.vue'
import MenuEdit from '../components/MenuEdit.vue'
import ArticleList from '../components/ArticleList.vue'
import ArticleEdit from '../components/ArticleEdit.vue'
import CommentList from '../components/CommentList.vue'
import CommentEdit from '../components/CommentEdit.vue'
import AdList from '../components/AdList.vue'
import AdEdit from '../components/AdEdit.vue'
import UserList from '../components/UserList.vue'
import AdminList from '../components/AdminList.vue'
import AdminEdit from '../components/AdminEdit.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'login', component: Login, meta: { isPublic: true } },
  {
    path: '/home',
    redirect: '/home',
    name: 'Main',
    component: Main,
    children:[
      {
        path:'/home',
        component:Home,
       
      },
      //菜品分类
      {path:'/categories/list',component:CategoryList},
      {path:'/categories/create',component:CategoryEdit},
      {path:'/categories/edit/:id',component:CategoryEdit,props:true},
      //菜谱
      {path:'/menus/list',component:MenuList},
      {path:'/menus/create',component:MenuEdit},
      {path:'/menus/edit/:id',component:MenuEdit,props:true},
      //社区文章
      {path:'/articles/list',component:ArticleList},
      {path:'/articles/create',component:ArticleEdit},
      {path:'/articles/edit/:id',component:ArticleEdit,props:true},
      //菜谱评论
      {path:'/comments/list',component:CommentList},
      {path:'/comments/create',component:CommentEdit},
      {path:'/comments/edit/:id',component:CommentEdit,props:true},
      //广告位
      {path:'/ads/list',component:AdList},
      {path:'/ads/create',component:AdEdit},
      {path:'/ads/edit/:id',component:AdEdit,props:true},
      //用户
      {path:'/users/list',component:UserList},
      //管理员
      {path:'/admins/list',component:AdminList},
      {path:'/admins/create',component:AdminEdit},
      {path:'/admins/edit/:id',component:AdminEdit,props:true},
    ]
  },
 
 
]
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
//每次切换路由时的处理办法
router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {  //如果不是公开访问的页面并且不存在用户token时跳转到登录页
    return next('/')
  }
  next()
})
export default router
