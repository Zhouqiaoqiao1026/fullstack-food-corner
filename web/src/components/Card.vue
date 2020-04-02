<template>
    <div class="card">
        <div class="card-header d-flex mb-2">
            <i class="iconfont mt-2 ml-2" :class="`icon-${icon}`"></i>
            <div class="flex-1 px-3 fs-llg pt-2"><strong>{{title}}</strong></div>
        </div>
        <div class="card-body d-flex flex-wrap w-100">
            <router-link tag="div" class="article_item ml-2 mt-2 pl-1" 
                v-for="item in menu" :key="item._id" :to="`/menu/detail/${item._id}`"> 
                <img style="" class="w-100" :src="item.images[0].img">
                <p class="fs-md ml-2">{{item.name}}</p>
            </router-link>
        </div>
            
     
       
    </div>
</template>
<style lang="scss">
.article_item{
    width: 170px;
    box-shadow: 0 0 3px #eee7e7;
}
</style>
<script >
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        menu:{type:Array,required:true}
    },

}
</script>
<style lang="scss">
@import '../style.scss';

</style>