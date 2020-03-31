const mongoose=require('mongoose')
//新建模型
const schema=new mongoose.Schema({
    //字段以及字段类型
    name:{type:String},
    icon:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'} //ref：关联哪个模型
   
})
/*
schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
  })

  schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
  })*/
module.exports=mongoose.model('Category',schema)