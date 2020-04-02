<template>
<div>
    <h1 style="margin-top:0px;">{{id ? '编辑':'新增'}}菜谱</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-tabs type="border-card">
        <!--基本信息-->
        <el-tab-pane label="基本信息">
         <el-form-item label="名称" >
            <el-col :span="6"><el-input width="150" v-model="model.name"></el-input></el-col>
         </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="model.parent">
          <el-option v-for="item in parents" 
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="轮播图展示">
         <el-col :span="8">
            <el-carousel :interval="4000" type="card" height="80px">
                  <el-carousel-item v-for="(item,i) in model.images" :key="i">
                    <img v-if="item.img" :src="item.img" class="avatar">
                  </el-carousel-item>
            </el-carousel>
         </el-col>
        </el-form-item>

         <el-form-item label="上传轮播图" >
           <el-upload
              :action="$http.defaults.baseURL+'/upload'"
              :file-list="model.images.img"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-success="afterUpload"
              :headers="getAuthHeaders()">
              <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
         </el-form-item>
         
         <el-form-item label="难度系数" >
           <el-rate
             style="margin-top:0.6rem"
             show-text
             :texts='texts'
             v-model="model.difficulty">
           </el-rate>
         </el-form-item>
         <el-form-item label="制作时间">
           <el-col :span="4"><el-input v-model="model.time">
             <template slot="append">分钟</template></el-input>
           </el-col>
         </el-form-item>
         <el-form-item label="简单描述">
           <el-col :span="15"><el-input type="textarea" :rows="2" v-model="model.description"></el-input></el-col>
         </el-form-item>
         <el-form-item> 
           <el-button type="primary" style=" margin-top:10px;" native-type="submit">提交</el-button>
         </el-form-item>
        </el-tab-pane>
        <!--end of 基本信息-->

        <!--食材信息-->
        <el-tab-pane label="食材准备" name="ingredient">
        <el-button  @click="model.ingredient.push({})"><i class="el-icon-plus"></i>添加食材</el-button>
        <el-row  :gutter="10" type="flex" style="flex-wrap:wrap;margin-top:5px;" v-for="(item,i) in model.ingredient" :key="i">
          <el-form-item label="食材">
          <el-col :span="12">
            <el-input v-model="item.foodname" placeholder="请填写食材名称"></el-input>
          </el-col>
          <el-col  :span="10" >
                <el-input v-model="item.amount" class="input-with-select">
                <el-select  v-model="item.unit" slot="append" placeholder="请选择单位" >
                  <el-option v-for="u in units" 
                  :key="u"
                  :label="u"
                  :value="u"></el-option>
                </el-select>
            </el-input>
          </el-col> 
          <el-col :span="2" > 
          <el-button size="small" type="danger" @click="model.ingredient.splice(i,1)">删除</el-button>
          </el-col>
          </el-form-item>
        </el-row>
        <el-form-item> 
         <el-button type="primary" style=" margin-top:10px;" native-type="submit">提交</el-button>
        </el-form-item>
        </el-tab-pane>
        <!--end of 食材信息-->
        
        <!--料理步骤-->
        <el-tab-pane label="料理步骤" >
           <el-button  @click="model.step.push({})"><i class="el-icon-plus"></i>添加料理步骤</el-button>
       <el-row :gutter="20" type="flex" style="flex-wrap:wrap;margin-top:10px;" v-for="(item,i) in model.step" :key="i">
         <el-col :span="2.5" >
           <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL+'/upload'"
            :show-file-list="false"
            :on-success="res=>$set(item,'image',res.url)"
            :headers="getAuthHeaders()">
            <img v-if="item.image" :src="item.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
         </el-col>
         <el-col :span="14"> 
           <el-input type="textarea" :rows="3" v-model="item.desc" placeholder="请填写步骤描述"></el-input>
         </el-col>
          <el-col :span="2" > 
          <el-button size="small" type="danger" style=" margin-top:20px;"  @click="model.step.splice(i,1)">删除</el-button>
          </el-col>
        </el-row>

      <el-form-item> 
         <el-button type="primary" style=" margin-top:10px;" native-type="submit">提交</el-button>
      </el-form-item>
        </el-tab-pane>
        <!--end of 料理步骤-->
        
      </el-tabs>
    </el-form>
</div>
</template>
<style>
.el-select .el-input {
    width: 120px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
</style>
<script>
export default {
  props:{
        id:{}
    },
  data(){
    return{
     fileList: [],
      texts:['简单','一般','中等','困难','极难'],
      model:{
        
        name:'',
        images:[],
        difficulty:0,  
        time:'', 
        description:'',
        ingredient:[],
        step:[],
       
      }, 
      selectparent:'',
       parents:[],
      units:['勺','克','个','片','毫升','斤','滴','根']
    }
  },
  methods:{
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    afterUpload(res){
      //this.$push(this.model,'images',res.url)
     this.model.images.push({img:res.url});
  // this.model.images=res.url;
			
    },
    async save(){
     let res; // eslint-disable-line no-unused-vars
     if(this.id){
      res=await this.$http.put(`rest/menus/${this.id}`,this.model)
     }
     else{
       res=await this.$http.post('rest/menus',this.model);
     }
     
     this.$router.push('/menus/list')  //跳转到list页面
            this.$message({
                type:'success',
                message:'保存成功'
            })
    },
    async fetch(){
       const res=await this.$http.get(`rest/menus/${this.id}`)
       this.model=res.data
    },
   async fetchParents(){
     const res=await this.$http.get(`rest/categories`)
      var newArr = res.data.filter(function (item) {
          if(item.parent){
            console.log(item)
           return item; 
           
          }
    })
    this.parents=newArr
    },
  },
  created(){
      this.fetchParents();
      this.id && this.fetch()
      
    }
}
</script>