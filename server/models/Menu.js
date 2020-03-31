const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    /*基本信息*/
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},  //菜谱一级分类
    secondparent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},  //菜谱二级分类
    name:{type:String}, //菜谱名
    images:[{ 
        img:{type:String}
    }],  //菜品轮播图
    difficulty:{type:Number},  //菜品制作难度系数
    time:{type:String},  //菜品制作时间
    description:{type:String},  //菜品描述
    /*所需原材料*/
    ingredient:[{              
        foodname:{type:String},  //原材料名称
        amount:{type:String},   //对应的用量
        unit:{type:String},   //对应的单位
    }],
    /*制作步骤*/
    step:[{    
       // number:{type:String},    //制作序号
        image:{type:String},   //对应步骤图
        desc:{type:String},   //对应步骤描述
    }]
},
    {
    timestamps: true //时间戳
  })
module.exports=mongoose.model('Menu',schema)  //导出模型