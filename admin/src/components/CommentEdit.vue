<template>
<div>
    <h1 style="margin-top:0px;">{{id ? '编辑':'新增'}}菜谱评论</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
    <el-form-item label="上级分类">
        <el-select v-model="model.parent">
        <el-option v-for="item in parents" 
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="名称" >
       <el-input width="150" v-model="model.name"></el-input>
    </el-form-item>

    <el-form-item label="图标" >
       <el-upload
         class="avatar-uploader"
         action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      parents:[]
    }
  },
  methods:{
    async save(){
     let res; // eslint-disable-line no-unused-vars
     if(this.id){
      res=await this.$http.put(`rest/comments/${this.id}`,this.model)
     }
     else{
       res=await this.$http.post('rest/comments',this.model);
     }
     
     this.$router.push('/comments/list')  //跳转到list页面
            this.$message({
                type:'success',
                message:'保存成功'
            })
    },
    async fetch(){
       const res=await this.$http.get(`rest/comments/${this.id}`)
       this.model=res.data
    },
    async fetchParents(){
      const res=await this.$http.get(`rest/comments`)
       this.parents=res.data
    },
  },
  created(){
      this.fetchParents();
      this.id && this.fetch()
      
    }
}
</script>