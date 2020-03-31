<template>
<div>
  <h1 style="margin-top:0px;">文章列表</h1>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="450" style="width: 100%">
       <el-table-column type="index" width="100" label="#"></el-table-column>
       <el-table-column prop="title" label="标题"></el-table-column>
       <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="icon" label="封面图">
         <template slot-scope="scope">
           <img :src="scope.row.banner" style="height:1rem">
         </template>
       </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
            <el-button type="text" size="small" 
            @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" size="small" 
            @click="remove(scope.row)">删除</el-button>
            </template>
    </el-table-column>
    </el-table>
   <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]" 
          :page-size="pagesize"         
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">    //这是显示总共有多少数据，
      </el-pagination>
</div>
</template>
<style>
.el-table-column{
  width:120px;
}
</style>
<script>
export default {
  data() {
      return {
        tableData: [],
        currentPage:1, //初始页
        pagesize:5,    //    每页的数据
      }
    },
    methods:{
      handleSizeChange: function (size) {
                this.pagesize = size;
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
        },
      async fetch(){
        const res=await this.$http.get(`rest/articles/`)
        this.tableData=res.data
      },
      async remove(row){
            this.$confirm(`是否确定要删除分类?"${row.name}"`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async() => {
            await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch() 
        });
        }
    },
   created(){
     this.fetch();
    }
}
</script>