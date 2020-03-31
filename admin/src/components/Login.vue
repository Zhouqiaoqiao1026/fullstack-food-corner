<template>
   <div class="login-container" style="height: 100vh;">
     <div>
       <el-card header="请先登录" class="login-card">
      <el-form  @submit.native.prevent="login">
        <el-form-item label="用户名" >
          <el-input type="text" v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"  >
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
         <el-form-item>
           <p style="color:red;">* 测试用户名：admin     密码：123456</p>
          <el-button type="primary" native-type="submit">登录</el-button>
          
        </el-form-item>
      </el-form>
    </el-card>
     </div>
    
  </div>
</template>

<script>
export default {
     data(){
    return{
      model:{}
    }
  },
  methods:{
     async login(){
     const res=await this.$http.post('login',this.model);
     //将后台返回的token写入浏览器的存储，下次打开浏览器仍然存在 sessionStorage下次打开就没有
     localStorage.token=res.data.token
     //清空浏览器保存的token 用localStorage.clear
     this.$router.push('/home')
     this.$message({
       type:'success',
       message:'登录成功'
     })
    }
  }
}
</script>
<style>
.login-container{
  background-color: rgb(160, 226, 226);
  padding: 5rem 0 0 25rem;
}
.login-card{
  width:25rem;
 
  }
</style>