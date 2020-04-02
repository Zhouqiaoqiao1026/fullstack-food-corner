<template>
  <div class="about">
    <div class="card">
      <h1>菜谱总数</h1>
      <p><strong>{{menusNum}}</strong></p>
    </div>
    <div class="card">
      <h1>文章总数</h1>
      <p><strong>{{articlesNum}}</strong></p>
    </div>
    <div class="card">
      <h1>用户总数</h1>
      <p><strong>{{usersNum}}</strong></p>
    </div>
    <div>
      <ve-pie :data="chartData">
    </ve-pie>
    </div>
    
  </div>
</template>
<style>
.card{
    width:250px;
    height: 160px;
    box-shadow:0 0 6px #eee;
    padding: 5px 0 0 30px;
    margin-right: 10px;
    float: left;
}
.card p{
    margin-top:0;
    font-size: 50px;
    color: rgb(28, 51, 121);
}
</style>
<script>
export default {
  data() {
      return {
      chartData:  {
        columns: [],
        rows: []
      },
      menusNum:'',
      articlesNum:'',
      usersNum:'',
      }
    },
    methods:{
      async fetchMenus(){
        const res=await this.$http.get(`rest/menus/`)
        this.menusNum=res.data.length
        res.data.forEach(item =>{  //查找已有菜谱的所有分类
           this.chartData.columns=item.parent.name
          });
      },

       async fetchArticles(){
        const res=await this.$http.get(`rest/articles/`)
        this.articlesNum=res.data.length
      },
      async fetchUsers(){
        const res=await this.$http.get(`rest/users/`)
        this.usersNum=res.data.length
      },
    },
    created(){
    this.fetchMenus()
    this.fetchArticles()
    this.fetchUsers()

    }
}
</script>
