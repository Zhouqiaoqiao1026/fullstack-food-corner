<template>
    <div>
        <div class="app bg-milk">
        <div class="topbar d-flex jc-between">
            <router-link tag="div" :to="`/home`" class="m-2">
            <i class="iconfont icon-fanhui"></i>
            </router-link>
            <router-link tag="div" class="m-2">
            <i class="iconfont icon-gengduo1"></i>
            </router-link>
        </div>
        <div class="menu_body w-100 bg-milk">
            <div class="menu_swiper">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in model.images" :key="index">
                        <img class="w-100" :src="item.img">
                    </swiper-slide>
                    <div class="swiper-pagination pagination-home  px-3 pb-2" slot="pagination"></div>
                </swiper>
            </div>
            <h2 class="m-4">{{model.name}}</h2>
            <p class="m-4 fs-md">{{model.description}}</p>
            <span class="fs-lg m-6 pl-5"><i class="iconfont icon-schedule fs-llg mr-1"></i>{{model.time}}分钟</span>
            <span class="fs-lg"><i class="iconfont icon-donut_large fs-llg mr-1"></i>{{model.difficulty | diff}}</span>
            <div class="shicai mb-4">
                <h3 style="border-left: 3px #eb5d5e solid" class="pl-4">主食材</h3>
                <div class="fs-md d-flex jc-between m-2" 
                    v-for="(item,index) in model.ingredient" :key="index" >
                    <div  class="ml-4"><span>{{item.foodname}}</span></div>
                    <div><span>{{item.amount}}</span><span class="mr-6">{{item.unit}}</span></div>
                </div>
            </div>
            <div class="step"  v-for="(item,index) in model.step" :key="index">
                <h3 style="border-left: 3px #eb5d5e solid" class="pl-4">
                    步骤 {{index+1}}<span class="text-grey-2">/{{model.step.length}}</span>
                </h3>
                <img :src="item.image" class="w-90 ml-4">
                <p class="fs-md m-4">{{item.desc}}</p>
            </div>
        </div>
    </div>
    </div>
    
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
    filters:{
     diff(val){
         var diffResult
         switch(val){
             case 1: 
                diffResult="简单" 
                break;
             case 2: 
                diffResult="一般"
                break;
             case 3: 
                diffResult="中等"
                break;
             case 4:
                diffResult="困难"
                break;
             case 5: 
                diffResult="极难"
                break;
         }
        return diffResult
    }
  },
     props:{
         id:{required:true}
     },
    data(){
        return{
            swiperOption: {
                pagination: {
                el: '.swiper-pagination'
            }
            },
            model:{}
        }
    },
     methods:{
        async fetch(){
            const res =await this.$http.get(`menu/detail/${this.id}`)
            this. model=res.data
        }
    },
    created(){
        this.fetch()
    }
    
}
</script>