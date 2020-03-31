<template>
    <div class="article_card d-flex jc-center">
        <div class="article_item w-90 m-1">
            <img style="border:1px solid #ff0000;height:40px;" class="w-100">
            <p style="line-height:1rem" class="ml-2">title</p>
            <p><i class="iconfont icon-face mr-2"></i>作者名</p>
        </div>
    </div>
</template>
<style lang="scss">
.item{
    box-shadow: 0 0 5px #eee7e7;
}
</style>
<script >
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
    }
}
</script>
<style lang="scss">
@import '../style.scss';
.article_item{
    box-shadow: 2px 2px 4px #f1f1f1;
}
</style>