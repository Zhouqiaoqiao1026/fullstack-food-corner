<template>
    <div class="login">
        <div class="topbar d-flex jc-between">
            <router-link tag="div" :to="`/home`" class="m-4  fs-md"><i class="iconfont icon-guanbi"></i></router-link>
            <router-link tag="div" :to="`/register`" class="m-4  fs-md">
            <span class="text-primary"><strong>注 册</strong></span></router-link>
        </div>
        <div class="login-body d-flex flex-column ai-center">
            <h1 class="mt-6 mb-6">Food Corner</h1>
            <form @submit.prevent="login" style="text-align:center">
                <input type="text" v-model="model.username" class="p-2" placeholder=" 请输入用户名">
                <input type="password" v-model="model.password" class="p-2" placeholder=" 请输入密码">
                <button class="bg-primary m-3 py-2 fs-lg" type="submit">登 录</button>
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
        async login(){
        const res=await this.$http.post('/login',this.model);
        localStorage.token=res.data.token
        localStorage.setItem('username', this.model.username);
        this.$router.push(`/personalcenter`)
        this.$message({
                type:'success',
                message:'登录成功'
            })
    }
    }
     
}
</script>