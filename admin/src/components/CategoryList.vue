<template>
<div>
  <h1 style="margin-top:0px;">菜谱分类列表</h1>
    <el-table  v-loading="loading"
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="450" style="width: 100%">
       <el-table-column type="index" width="50" label="#"></el-table-column>
       <el-table-column prop="parent.name" label="上级分类"></el-table-column>
       <el-table-column prop="name" label="名称"></el-table-column>
       <el-table-column prop="icon" label="图标">
         <template slot-scope="scope">
           <img :src="scope.row.icon" style="height:1rem">
         </template>
       </el-table-column>
       <el-table-column label="操作" fixed="right">
         <template slot-scope="scope">
           <el-button size="mini" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
           <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
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
.el-pagination{
  margin:20px 0 0 200px;
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
      async fetch(){
        const res=await this.$http.get(`rest/categories/`)
        this.tableData=res.data
      },
      async remove(row){
            this.$confirm(`是否确定要删除分类?"${row.name}"`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async() => {
            await this.$http.delete(`rest/categories/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch() 
        });
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
        },
    },
    
   created(){
     this.fetch();
    }
}
</script>