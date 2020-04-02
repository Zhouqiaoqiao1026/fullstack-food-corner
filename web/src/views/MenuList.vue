<template>
    <div class="menulist">
         <div class="topbar d-flex jc-between pb-2">
            <router-link tag="div" :to="`/category`" class="m-2 mt-3">
            <i class="iconfont icon-fanhui"></i>
            </router-link>
           <h2>{{pa.name}}</h2>
            <router-link tag="div" :to="`/community`" class="m-2 mt-3">
            <i class="iconfont icon-gengduo1"></i>
            </router-link>
        </div>

       <div class="w-100 px-2">
            <router-link tag="div" class="menuitem d-flex pb-3" 
                v-for="item in model" :key="item._id" :to="`/menu/detail/${item._id}`">
               <img style="" class="menuimg w-45" :src="item.images[0].img">
               <div class="ml-3">
                   <h3 class="fs-lg">{{item.name}}</h3>
                   <p class="fs-md text-grey-3">用时：{{item.time}} 分钟</p>
                   <p class="fs-md">制作难度：{{item.difficulty | diff}}</p>
                   <p class="fs-md">
                       <span v-for="(i,index) in item.ingredient" :key="index">
                           {{i.foodname }}
                       </span>
                   </p>
               </div> 
            </router-link>
       </div>
    </div>
</template>

<style lang="scss" scoped>
.menuimg{
    border-radius: 15px;
}

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
            model:{},
            pa:[],
        }
    },
     methods:{
     async fetchMenu(){
        const res= await this.$http.get(`menu/list/${this.id}`);
        this.model=res.data
     },
     async fetchParent(){
        const res= await this.$http.get(`category/${this.id}`);
        this.pa=res.data
     },
   },
   created(){
       this.fetchParent()
        this.fetchMenu();
    },
    
}
</script>