<template>
<div>
    <h1 style="margin-top:0px;">{{id ? '编辑':'新增'}}广告位</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
    <el-form-item label="广告轮播图" >
       <el-upload
        class="avatar-uploader"
        :action="$http.defaults.baseURL+'/upload'"
        :show-file-list="false"
        :on-success="afterUpload"
        :headers="getAuthHeaders()">
        <img v-if="model.image" :src="model.image" class="avatar">
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
    afterUpload(res){
      this.$set(this.model,'image',res.url)
    },
    async save(){
     let res; // eslint-disable-line no-unused-vars
     if(this.id){
      res=await this.$http.put(`rest/ads/${this.id}`,this.model)
     }
     else{
       res=await this.$http.post('rest/ads',this.model);
     }
     
     this.$router.push('/ads/list')  //跳转到list页面
            this.$message({
                type:'success',
                message:'保存成功'
            })
    },
    async fetch(){
       const res=await this.$http.get(`rest/ads/${this.id}`)
       this.model=res.data
    },
  },
  created(){
      this.id && this.fetch()
      
    }
}
</script>