<template>
    <div class="reg">
        <div class="topbar d-flex jc-between">
            <router-link tag="div" :to="`/login`" class="m-4  fs-md"><i class="iconfont">返回</i></router-link>
        </div>
        <div class="reg-body d-flex flex-column ai-center">
            <h1 class="mt-6 mb-6">Food Corner</h1>
            <form @submit.prevent="submitUser" style="text-align:center">
                <input type="text" v-model="model.username" class="p-2" placeholder=" 请输入用户名">
                <input type="text" v-model="model.password" class="p-2" placeholder=" 请设置密码">
                <button class="bg-primary m-3 py-2 fs-lg" type="submit">注 册</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
input{
    width:70%;
    height: 40px;
    border-radius:20px;
    border-style:none;
    margin-bottom: 20px;
    box-shadow: 0 0 8px #dbd9d9;
}
button{
     width:30%;
    height: 45px;
    border-radius:25px;
    border:0;
    color:#fff;
}
</style>

<script>
export default {
    data(){
        return{
        model:{},
    }
    },
    methods:{
        async submitUser(){
         let res; // eslint-disable-line no-unused-vars
         res=await this.$http.post('/register',this.model);
         //localStorage.token=res.data.token
        this.$router.push(`/login`)  //跳转到list页面
            this.$message({
                type:'success',
                message:'注册成功'
            })
    }
    }
      
}
</script>