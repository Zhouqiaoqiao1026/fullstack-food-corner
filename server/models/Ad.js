const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    image:{type:String}
})
module.exports=mongoose.model('Ad',schema)  //导出模型