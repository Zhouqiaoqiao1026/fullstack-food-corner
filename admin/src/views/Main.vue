<template>
 <el-container style="height: 100vh; border: 1px solid #eee;">
  <el-aside width="200px" style="background-color: rgb(255, 255, 255)">
     <h5 style="text-align:center">Food Corner 后台管理系统</h5>
    <el-menu router :default-active="$route.path">
      <el-submenu index="0">
        <template slot="title"><i class="el-icon-s-home"></i>首页</template>
        <el-menu-item-group>
          <el-menu-item index="/home">数据统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>菜谱分类管理</template>
        <el-menu-item-group>
          <el-menu-item index="/categories/list">菜谱分类列表</el-menu-item>
          <el-menu-item index="/categories/create">新增菜谱分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-order"></i>菜谱管理</template>
        <el-menu-item-group>
          <el-menu-item index="/menus/list">菜谱列表</el-menu-item>
          <el-menu-item index="/menus/create">新增菜谱</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-s-comment"></i>菜品评论管理</template>
        <el-menu-item-group>
          <el-menu-item index="/comments/list">菜品评论列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title"><i class="el-icon-s-flag"></i>社区管理</template>
        <el-menu-item-group>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title"><i class="el-icon-s-tools"></i>系统管理</template>
         <el-menu-item-group title="广告位">
           <el-menu-item index="/ads/list">广告位列表</el-menu-item>
           <el-menu-item index="/ads/create">新建广告位</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="用户">
           <el-menu-item index="/users/list">用户列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="管理员">
           <el-menu-item index="/admins/list">管理员列表</el-menu-item>
           <el-menu-item index="/admins/create">新建管理员</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
 <el-header style="text-align: right; font-size: 12px;height:40px">
      <el-dropdown>
        <i class="el-icon-setting" ></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-main>
     <router-view :key="$route.path"></router-view>
    </el-main>

  </el-container>
</el-container>
</template>

<style>
  .el-header {
    background-color: #c9e1ebc2;
    color: #333;
    line-height: 40px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    methods:{
          exit(){//退出功能
            //弹出确认对话框
            //用户点击确认，跳回用户登录页面，清除token
                this.$confirm('确定要退出登录吗?', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
                  }).then(() => {
                    this.$message({
                       type: 'success',
                       message: '退出成功!'
                     });
                     //确认退出，清除token
                     localStorage.clear()
                     //跳转登录页面(编程式导航)
                     this.$router.push('/')

                }).catch(() => {
              this.$message({
               type: 'info',
               message: '已取消退出'
          });          
        });

          } 
      }
  };
</script>