<template>
  <div class="home">
    <div class="topbar d-flex jc-center">
      <img src="../assets/logo.png" style="width:220px">
    </div>
  
  <!--搜索框-->
  <div class="d-flex jc-center my-1 pb-1">
    <input class="search w-90 p-2 bg-grey-1 text-grey-2" placeholder=" 搜索食谱" v-model="searchMenu"/>
    <i class="iconfont icon-sousuo0101" style="margin-top:10px" @click="searchBtn"></i>
  </div>
  <!--轮播图-->
  <div>
  <swiper :options="swiperOption">
    <swiper-slide v-for="item in ads" :key="item">
      <img class="w-100" :src="item.image">
    </swiper-slide>
    <div class="swiper-pagination pagination-home  px-3 pb-2" slot="pagination"></div>
  </swiper>
  </div>
  <!--横向活动菜单-->
  <p class="fs-llg my-2 px-2"><i class="iconfont icon-icon-test1 mr-2"></i><strong>热门活动</strong></p>
  <div class="father_scroll d-flex" ref="father_scroll">
     <div class="child_scroll" ref="child_scroll">
          <router-link tag="div" v-for="item in articles" :key="item._id" class="mx-1"
          :to="`/article/detail/${item._id}`">
            <div class="bg-grey-1" style="height:80px;border-radius:10px">
              <img :src="item.banner" class="h-100" style="border-radius:10px">
            </div>
          </router-link>
    </div>
  </div>
  <!--菜谱列表-->
  <div class="food-list mt-6 pt-6">
    <m-card title="精选菜谱" icon="iconfont icon-icon-test" :menu="menus">
    </m-card>
    <m-card title="最受欢迎食谱" icon="iconfont icon-dangao" :menu="menus">
    </m-card>
    <m-card title="烹饪灵感" icon="iconfont icon-meishi" :menu="menus">
    </m-card>
  </div>
  <div class="p-5"></div>
  
  </div>
</template>

<style lang="scss">
@import '../style.scss';
.search{
  border-radius: 15px ;
  border-style:none;
}
.father_scroll
{
  position: absolute;
  height: 80px;
  width: 100%;
  overflow: auto;
  z-index:5;
}
.child_scroll{
  width: 100%;
  height: 80px;
  position: absolute;
  display: flex;
}

</style>

<script>
import BScroll from 'better-scroll'
export default {
   data(){
      return {
       searchMenu:'', //想要搜索的菜谱
       searchData:'' ,//
       swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        articles:[],
        menus:[],
        ads:[]
      }
    },
   methods:{
     async fetchAd(){
       const res= await this.$http.get('ad/list');
        this.ads=res.data
     },
     async fetchActicle(){
       const res= await this.$http.get('article/list');
        this.articles=res.data
     },
     async fetchMenu(){
       const res= await this.$http.get('menu/list');
        this.menus=res.data
     },
        searchBtn(){
          var searchMenu = this.searchMenu;
          if (searchMenu) {
                this.searchData = this.menus.filter(
                  value=>value.name.indexOf(this.searchMenu)!==-1
                )
          }
          this.$router.push({path: '/search/list', query: {name: this.searchData}});
 }
   },
   created(){
   //横向滚动条
      this.$nextTick(() => {//回调横向滚动方法
         this.personScroll();
    });
    //调用各个fetch
    this.fetchAd()
    this.fetchActicle()
    this.fetchMenu()
    },

  GetNum() {
        this.width=80*3;
        return this.width;
      },//计算出横向滚动组件需要的总宽度
      personScroll() {
        this.$refs.child_scroll.style.width = this.GetNum() + "px";
        this.$nextTick(() => {
          if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.father_srcoll, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
      },//横向滚动
   
}
</script>