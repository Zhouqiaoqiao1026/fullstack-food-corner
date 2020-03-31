const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    menuname:{type:mongoose.SchemaTypes.ObjectId,ref:'Menu'},  //菜谱名称
    username:{type:String},  //评论的用户名
    content:{type:String},  //评论内容

})
module.exports=mongoose.model('Comment',schema)  //导出模型