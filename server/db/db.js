
module.exports=app=>{
   //连接数据库
   const mongoose=require("mongoose")
   mongoose.connect('mongodb://127.0.0.1:27017/fullstack-food-corner',{
       useNewUrlParser:true   //连接参数
   })

  // require('require-all')(__dirname + '/../models') //引用了models里所有js
}