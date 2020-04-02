module.exports=options=>{
    return async(req,res,next)=>{
        const modelName=require('inflection').classify(req.params.resource) //小写负数转化为大写单数
        req.Model=require(`../models/${modelName}`)
        next()
    }
}