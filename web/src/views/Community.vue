<template>
<div>
   <h2 class="d-flex jc-center">精选文章</h2>
    <div class="article_card m-2">
        <router-link tag="div" class="article_item w-100" 
        v-for="item in model" :key="item._id"
        :to="`/article/detail/${item._id}`">
            <img style="" class="w-100" :src="item.banner">
            <p style="line-height:1.5rem;width:20rem" class="ml-2 fs-md">{{item.title}}</p>
            <span class="text-grey-2" style="position:absolute;right:20px;">{{item.createdAt | date}}</span>
            <p class="m-2 pb-2"><i class="iconfont icon-face mr-2"></i>{{item.author}}</p>
        </router-link>
        <div>
        </div>
    </div>
     <div class="my-6"></div>
</div>
 
</template>
<style lang="scss">
@import '../style.scss';
.article_item{
    box-shadow: 2px 2px 4px #f1f1f1;
}
.item{
    box-shadow: 0 0 5px #eee7e7;
}
</style>
<script>
 import dayjs from 'dayjs'
export default {
  filters:{
    date(val){
        return dayjs(val).format('MM/DD')
    }
  },
  data(){
  return{
    model:null
  }
  },
    methods:{
      async fetch(){
        const res= await this.$http.get('article/list');
        this.model=res.data
      }
    },
    created(){
      this.fetch()
    }
   
  }
</script>