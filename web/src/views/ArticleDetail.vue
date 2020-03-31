<template>
    <div class="app bg-milk">
        <div class="topbar d-flex jc-between">
            <router-link tag="div" :to="`/community`" class="m-2">
            <i class="iconfont icon-fanhui"></i>
            </router-link>
            <router-link tag="div"  class="m-2">
            <i class="iconfont icon-gengduo1"></i>
            </router-link>
        </div>
        <div class="article_body w-100 bg-milk">
            <img :src="model.banner" class="w-100">
            <p class="fs-lg ml-3"><i class="iconfont icon-face fs-llg mr-1"></i>
            {{model.author}}</p>
            <h3 class="ml-3">{{model.title}}</h3>
            <div v-html="model.body" class=" kk w-100 fs-md px-3 body"> </div>
            <p class="text-grey-2 m-2 ml-4">{{model.createdAt | date}}</p>
        </div>
    </div>
</template>

<style lang="scss">
.body{
     img{
        max-width:100%;
        height: auto;
        }
}
</style>

<script>
import dayjs from 'dayjs'
export default {
     props:{
         id:{required:true}
     },
    data(){
        return{
            model:{}
        }
    },
  filters:{
    date(val){
        return dayjs(val).format('YYYY/MM/DD')
    }
  },
    methods:{
        async fetch(){
            const res =await this.$http.get(`article/detail/${this.id}`)
            this. model=res.data
        }
    },
    created(){
        this.fetch()
    }
}
</script>