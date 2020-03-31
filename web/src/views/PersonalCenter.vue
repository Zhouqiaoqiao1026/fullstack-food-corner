<template>
  <div class="home">
    <div class="topbar d-flex jc-between pb-2">
            <router-link tag="div" :to="`/`" class="m-2 mt-3">
            <i class="iconfont icon-fanhui"></i>
            </router-link>
            <router-link tag="div" :to="`/`" class="m-2 mt-3">
            <i class="iconfont icon-gengduo1"></i>
            </router-link>
        </div>
  <div class="info">
    <div class="name d-flex"><i class="iconfont icon-face ml-5 mt-5" style="font-size:50px"></i>
    <h1 class=" pt-2 pl-4">{{model.username}}</h1>
    <p class="text-grey-3 fs-md ml-6 pl-4 pt-3">{{model.createdAt | date}} 加入</p>
    </div>
  </div>

  <div class="content">
    <button class="quit bg-primary text-white p-2 w-100 fs-lg" @click="quit">退出登录</button>
  </div>
  
  </div>
</template>

<style scoped>
.content{
  margin-top: 450px;
}

</style>

<script>
import dayjs from 'dayjs'
export default {
  filters:{
    date(val){
        return dayjs(val).format('YYYY'+'年'+'MM'+'月'+'DD'+'日')
    }
  },
  data(){
    return{
      model:{},
    }
  },
   methods:{
     fetchUser(){
        this.model.username=localStorage.getItem('username')
     },
     quit(){
       localStorage.clear()
        this.$router.push(`/login`)
     }
   },
    created(){
       this.fetchUser()
    },
}
</script>