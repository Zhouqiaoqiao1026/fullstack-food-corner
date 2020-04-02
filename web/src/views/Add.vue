<template>
  <div class="home">
    <div class="topbar d-flex jc-between">
      <router-link tag="div" :to="`/home`" class="m-3  fs-md"><span >取消</span></router-link>
      <h2>上传菜谱</h2> 
      <span class="p-3 text-primary fs-md" @click="onSubmit()"><strong>发布</strong> </span>
    </div>
    <form>
    <div class="fengmian  p-5 d-flex jc-center" >
      <el-upload
      class="w-45"
              :action="$http.defaults.baseURL+'/upload'"
              :file-list="model.images.img"
              list-type="picture-card"
             
              :on-success="afterUpload">
              <span class="fs-md">上传封面图</span>
          </el-upload>
    </div>
      <input class="title w-90 p-2 bg-grey-1 text-grey-2 m-1 ml-3" v-model="model.name" placeholder="给这道菜取个名称"/>
      <input class="des w-90 p-2 bg-grey-1 text-grey-2 ml-3" v-model="model.description" placeholder="这道菜的相关描述"/>

    <div class="time ml-3 m-2">
      <i class="iconfont icon-schedule  mt-1"></i>
      时间：<input class="w-90 p-2 bg-grey-1 text-grey-2" style="width:50px;" v-model="model.time"> 分钟
    </div>
    <div class="nandu ml-3 m-1"><i class="iconfont icon-donut_large  mt-1"></i>
     难度：<select v-model="model.difficulty" style="width:70px;height: 30px;margin-top: 5px;margin-bottom: 5px;border-radius:5px;">
          <option v-for="item in diff" v-bind:value="item.id" v-text="item.name" :key="item._id"
           ></option>
        </select>
    </div>

    <div class="add_food">
      <h3 class="ml-3">添加食材</h3>
      <div class="food ml-3" v-for="(item,index) in model.ingredient" :key="index" style="margin-bottom:5px">
       <input v-model="item.foodname" class="title w-45 p-2 bg-grey-1 text-grey-2 mr-1" placeholder="食材：如牛肉"/>
       <input v-model="item.amount" class="title w-45 p-2 bg-grey-1 text-grey-2" placeholder="用量：如500g"/>
      </div>
      <button class="bg-primary m-3 py-2"  @click="model.ingredient.push({})">添加一种食材</button>
    </div>

    <div class="add_step">
      <h3 class="ml-3">添加步骤</h3>
      <div class="step" v-for="ite in model.step" :key="ite._id" style="margin-bottom:5px">
      
       <input v-model="ite.desc" class="title w-90 p-2 bg-grey-1 text-grey-2 m-3" placeholder="详细描述一下这个步骤"/>
      </div>
      <button class="bg-primary m-3 py-2" @click="model.step.push({})">添加一个步骤</button>
    </div>

    <div class="fenlei d-flex my-2">
       <h3 class="ml-3">食谱分类</h3>
       <div class="select_fenlei">
        <select v-model="model.parent" style="width:100px;height: 30px;margin-top: 5px;margin-bottom: 5px;margin-left: 10px;border-radius:5px;">
          <option v-for="item in cats" 
        :value="item._id" v-text="item.name" :key="item._id" ></option>
        </select>
       </div>
    </div>
    </form>
    <div class="p-6"></div>
  </div>
</template>

<style scoped>
input{
  border-radius: 20px ;
  border-style:none;
}
button{
  border-radius: 15px;
  border:0;
  color:#fff;
}
  .avatar {
    min-width: 5rem;
    height: 5rem;
    display: block;
  }

</style>

<script>
    export default {
      data(){
          return{
            model:{
              name:'',
              description:'',
              images:[],
              difficulty:'',
              time:'',
              parent:'',
              ingredient:[],
              step:[]
            },
          //select框下拉内容
          cats:[],
          diff:[{name:"简单",id:1},{name:"一般",id:2},{name:"中等",id:3},{name:"困难",id:4},{name:"极难",id:5}],
          }
      },
      methods:{
       afterUpload(res){
            this.model.images.push({img:res.url});
        },
        async fetchCategories(){
          const res= await this.$http.get(`category/`);
          this.cats=res.data
        },
        async onSubmit(){
           let res; // eslint-disable-line no-unused-vars
           res=await this.$http.post('/menu',this.model);
           this.$router.push('/home')
        }
      },
      created(){
        this.fetchCategories()
      }
    }
</script>