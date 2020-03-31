const mongoose=require('mongoose')
const schema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    banner:{type:String},
    author:{type:String},
  }, {
    timestamps: true //时间戳
  })
module.exports=mongoose.model('Article',schema)  //导出模型