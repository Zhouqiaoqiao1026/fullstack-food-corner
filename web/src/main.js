import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import http from './http'
Vue.prototype.$http=http
Vue.use(VueAwesomeSwiper, /* { default global options } */)

// require styles
import 'swiper/dist/css/swiper.css'
import './style.scss'

//iconfont
import './assets/iconfont/iconfont.css'
//card
import Card from './components/Card.vue'
Vue.component('m-card',Card)

//artucle-card
import ArticleCard from './components/ArticleCard.vue'

import './plugins/element.js'
Vue.component('a-card',ArticleCard)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
