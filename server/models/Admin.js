const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    username:{type:String},
    password:{
        type:String,
        select:false,//密码默认查不出来
        set(val){
            return require('bcryptjs').hashSync(val,12)
        }
    },  
})
module.exports=mongoose.model('Admin',schema)  //导出模型