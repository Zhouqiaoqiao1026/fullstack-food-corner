<template>
  <div class="home d-flex">
  <div class="left-nav">
    <ul class="nav-title fs-lg">
      <li v-for="(item,index) in tabParent" 
      :key="item._id" @click="get(index)" 
      :class="{active:cur==index}">
         <h4>{{item.name}}</h4>
      </li>
    </ul>
  </div>
  <div class="nav-content d-flex jc-start flex-wrap mt-5 ml-3" style="width:300px;height:300px;">
    <div style="width:80px;text-align:center;" class="mt-3"
        v-for="(item,index) in tabChildren" 
        :key="index">
        <router-link tag="div" :to="`/menu/list/${item._id}`">
        <img :src="item.icon" class=" " style="width:50px;height:50px">
          <p class="fs-md">{{item.name}}</p>
        </router-link>
    </div>
  </div>
  </div>
</template>

<style lang="scss" scoped>
ul{
  padding: 0;
}
li{
  list-style: none;
  line-height: 50px;
  padding-left: 30px;
}
.left-nav{
  width: 10rem;
  height: 95vh;
  box-shadow: 2px 0 2px rgb(219, 216, 216);;
}
.nav-title {
    color: rgb(158, 153, 153);
}
.nav-title .active{
    color: rgb(0, 0, 0);
   border-left: 2px solid red;
}
</style>
<script>
export default {
  name: 'Home',
  data(){
    return{
       tabParent: [],
       tabChildren: [],
       cur: 0,
       curId:'',  //获取的父级分类id
       model:null
    }
  },
  methods:{
    get(index){
      this.cur=index;
      this.curId=this.tabParent[index]._id;
      this.fetchChildren()
    },
      async fetchParent(){
        const res= await this.$http.get('category/list');
        this.tabParent=res.data
        this.fetchInitChildren(res.data[0]._id)  //初始化右边内容
      },
      async fetchChildren(){
        const res= await this.$http.get(`category/list/${this.curId}`);
        this.tabChildren=res.data
      },
      async fetchInitChildren(curId){
        const res= await this.$http.get(`category/list/${curId}`);
        this.tabChildren=res.data
      },
     
    },
    created(){
      this.fetchParent()
      this.fetchChildren()
    }
}
</script>

