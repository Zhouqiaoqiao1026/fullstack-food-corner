<template>
  <div id="app">
    <div class="nav d-flex jc-around py-2">
     <div class="nav-item"
        v-for="(item, index) of list"
        :key="index"
        :class="{active:index == num}"
        @click="addClassName(index)">
        <router-link  tag="div" class="nav-link" :to="item.path">
          <i v-show="num!=index" :class="item.icon" class="fs-ic"></i>
          <i v-show="num==index" :class="item.active" class="fs-ic"></i>
          <p>{{ item.name }}</p>
        </router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      num: 0,
      list: [
        {
          icon: "iconfont icon-shouyeweixuanzhong",  //原始显示的图标
          active: "iconfont icon-shouyexuanzhong", //点击之后要显示的图标
          name: "首 页",
          path: "/home"
        },
        {
          icon: "iconfont icon-guanzhuweixuanzhong",
          active: "iconfont icon-guanzhuxuanzhong",
          name: "社 区",
          path: "/community"
        },
        {
          icon: "iconfont icon-xinzeng",
          active: "iconfont icon-xinzeng1",
          name: "发 布",
          path: "/add"
        },
        {
          icon: "iconfont icon-fenlei",
          active: "iconfont icon-fenlei1",
          name: "分 类",
          path: "/category"
        },
        {
          icon: "iconfont icon-zhanghaoweixuanzhong",
          active: "iconfont icon-zhanghaoxuanzhong",
          name: "我 的",
          path: "/personalcenter"
        },
        ],
     
      tabName: ""
    };
  },
  methods: {
    addClassName: function(index) {
      this.num = index;
    },
   //s getLocalStorage
  }
}
</script>

<style scoped>
.nav{
  position:fixed;    
  z-index :100;    
  left :0;    
  right :0;    
  bottom:-20px; 
  background: #fff;
  box-shadow:0 -2px 6px rgb(226, 225, 225);
}
p{
    margin-top:3px;
}
</style>