<template>
<div>
    <h1 style="margin-top:0px;">{{id ? '编辑':'新增'}}管理员</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
    <el-form-item label="用户名" >
       <el-col :span="6"><el-input width="150" v-model="model.username"></el-input></el-col>
    </el-form-item>
    <el-form-item label="密码" >
       <el-col :span="6"><el-input width="150" v-model="model.password"></el-input></el-col>
    </el-form-item>
    <el-form-item> 
      <el-button type="primary" native-type="submit">提交</el-button>
    </el-form-item>
    </el-form>
  
   
</div>
</template>

<script>
export default {
  props:{
        id:{}
    },
  data(){
    return{
      model:{},
    }
  },
  methods:{
    async save(){
     let res; // eslint-disable-line no-unused-vars
     if(this.id){
      res=await this.$http.put(`rest/admins/${this.id}`,this.model)
     }
     else{
       res=await this.$http.post('rest/admins',this.model);
     }
     this.$router.push('/admins/list')  //跳转到list页面
            this.$message({
                type:'success',
                message:'保存成功'
            })
    },
    async fetch(){
       const res=await this.$http.get(`rest/admins/${this.id}`)
       this.model=res.data
    },
  },
  created(){
      this.id && this.fetch()
      
    }
}
</script>